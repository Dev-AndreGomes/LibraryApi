from django.db import models
from livro.models import Livro  
from pessoa.models import Pessoa  
from django.utils.timezone import now

class Emprestimo(models.Model):
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name="emprestimos")
    livro = models.ForeignKey(Livro, on_delete=models.CASCADE, related_name="emprestimos")
    data_emprestimo = models.DateField(default=now)
    data_devolucao = models.DateField(null=True, blank=True)
    devolvido = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.pessoa.nome} - {self.livro.titulo}"
