from django.urls import path
from .views import get_emprestimo_detalhes,  registrar_emprestimo, retornar_emprestimo, livros_mais_emprestados, usuarios_com_emprestimos_pendentes

urlpatterns = [
    path('registrar/', registrar_emprestimo, name='registrar_emprestimo'),
    path('devolver/', retornar_emprestimo, name='retornar_emprestimo'),
    path('detalhes/<int:emprestimo_id>/', get_emprestimo_detalhes, name='get_emprestimo_detalhes'),
    path('relatorio/livros_mais_emprestados/', livros_mais_emprestados, name='livros_mais_emprestados'),
    path('relatorio/usuarios_com_emprestimos_pendentes/', usuarios_com_emprestimos_pendentes, name='usuarios_com_emprestimos_pendentes'),
]
