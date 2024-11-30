from django.urls import path
from .views import get_pessoas, get_pessoa,create_pessoa, pessoa_detalhes

urlpatterns = [
    path('pessoas/', get_pessoas, name='get_pessoas'),
    path('pessoas/<int:pk>', get_pessoa, name='get_pessoa'),
    path('pessoas/create/', create_pessoa, name='create_pessoa'),
    path('pessoas/create/<int:pk>', pessoa_detalhes, name='pessoa_detalhes')
]
