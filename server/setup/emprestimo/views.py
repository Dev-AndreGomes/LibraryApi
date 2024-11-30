from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Emprestimo
from livro.models import Livro
from pessoa.models import Pessoa
from datetime import datetime
from django.utils.timezone import now
from django.db.models import Count


MAX_EMPRESTIMOS = 5  


@api_view(['GET'])
def get_emprestimo_detalhes(request, emprestimo_id):
    try:
        emprestimo = Emprestimo.objects.get(id=emprestimo_id)
        
        emprestimo_data = {
            "id": emprestimo.id,
            "pessoa": {
                "id": emprestimo.pessoa.id,
                "nome": emprestimo.pessoa.nome,
                "email": emprestimo.pessoa.email
            },
            "livro": {
                "id": emprestimo.livro.id,
                "titulo": emprestimo.livro.titulo,
                "autor": emprestimo.livro.autor
            },
            "data_devolucao": emprestimo.data_devolucao,
            "devolvido": emprestimo.devolvido,
        }
        
        return Response(emprestimo_data, status=status.HTTP_200_OK)

    except Emprestimo.DoesNotExist:
        return Response({"error": "Empréstimo não encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def registrar_emprestimo(request):
    pessoa_id = request.data.get("pessoa_id")
    livro_id = request.data.get("livro_id")
    data_devolucao = request.data.get("data_devolucao")

    if not pessoa_id or not livro_id or not data_devolucao:
        return Response({"error": "Dados insuficientes. Informe pessoa_id, livro_id e data_devolucao"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        data_devolucao = datetime.strptime(data_devolucao, "%Y-%m-%d").date()
        if data_devolucao <= now().date():
            return Response({"error": "A data de devolução deve ser no futuro"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Formato de data inválido. Use YYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        pessoa = Pessoa.objects.get(id=pessoa_id)
        livro = Livro.objects.get(id=livro_id)
    except Pessoa.DoesNotExist:
        return Response({"error": "Pessoa não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    except Livro.DoesNotExist:
        return Response({"error": "Livro não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    if not livro.disponivel:
        return Response({"error": "Livro não está disponível para empréstimo"}, status=status.HTTP_400_BAD_REQUEST)

    emprestimos_ativos = Emprestimo.objects.filter(pessoa=pessoa, devolvido=False).count()
    if emprestimos_ativos >= MAX_EMPRESTIMOS:
        return Response({"error": "Limite de empréstimos atingido"}, status=status.HTTP_400_BAD_REQUEST)

    emprestimo = Emprestimo.objects.create(
        pessoa=pessoa,
        livro=livro,
        data_devolucao=data_devolucao
    )
    livro.disponivel = False
    livro.save()

    return Response({
        "message": "Empréstimo registrado com sucesso",
        "emprestimo_id": emprestimo.id
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def retornar_emprestimo(request):
    emprestimo_id = request.data.get("emprestimo_id")

    if not emprestimo_id:
        return Response({"error": "ID do empréstimo não fornecido"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        emprestimo = Emprestimo.objects.get(id=emprestimo_id)
    except Emprestimo.DoesNotExist:
        return Response({"error": "Empréstimo não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    if emprestimo.devolvido:
        return Response({"error": "Este empréstimo já foi devolvido"}, status=status.HTTP_400_BAD_REQUEST)

    emprestimo.devolvido = True
    emprestimo.save()

    emprestimo.livro.disponivel = True
    emprestimo.livro.save()

    return Response({"message": "Livro devolvido com sucesso"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def livros_mais_emprestados(request):
    livros = Emprestimo.objects.values('livro__titulo') \
        .annotate(quantidade=Count('livro')) \
        .order_by('-quantidade')[:10]  

    data = [{
        'titulo': livro['livro__titulo'],
        'quantidade': livro['quantidade']
    } for livro in livros]

    return Response(data)


@api_view(['GET'])
def usuarios_com_emprestimos_pendentes(request):
    usuarios = Emprestimo.objects.filter(devolvido=False) \
        .values('pessoa__nome', 'pessoa__email') \
        .annotate(quantidade_emprestimos=Count('pessoa')) \
        .order_by('pessoa__nome')

    data = [{
        'nome': usuario['pessoa__nome'],
        'email': usuario['pessoa__email'],
        'quantidade_emprestimos': usuario['quantidade_emprestimos']
    } for usuario in usuarios]

    return Response(data)