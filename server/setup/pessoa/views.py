from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pessoa
from .serializer import PessoaSerializer
from django.db.models import Q  

@api_view(['GET'])
def get_pessoas(request):
    search = request.query_params.get('search', '') 
    
    if search:
        pessoas = Pessoa.objects.filter(
            Q(nome__icontains=search) | 
            Q(email__icontains=search) | 
            Q(id__icontains=search)
        )
    else:
        pessoas = Pessoa.objects.all()

    serializedData = PessoaSerializer(pessoas, many=True).data
    return Response(serializedData)

@api_view(['GET'])
def get_pessoa(request, pk):
    try:
        pessoa = Pessoa.objects.get(pk=pk)
    except Pessoa.DoesNotExist:
        return Response({"error": "Pessoa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

    serialized_data = PessoaSerializer(pessoa).data
    return Response(serialized_data)

@api_view(['POST'])
def create_pessoa(request):
    data = request.data
    serializer = PessoaSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def pessoa_detalhes(request, pk):
    try:
        pessoa = Pessoa.objects.get(pk=pk)
    except Pessoa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        pessoa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        data = request.data
        serializer = PessoaSerializer(pessoa, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
