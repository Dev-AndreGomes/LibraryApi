from django.urls import path
from .views import get_livros, get_livro ,create_livros, livro_detalhes

urlpatterns = [
    path('livros/', get_livros, name='get_livros'),
    path('livros/<int:pk>', get_livro, name='get_livro'),
    path('livros/create/', create_livros, name='create_livros'),
    path('livros/create/<int:pk>', livro_detalhes, name='livro_detalhes'),
]
