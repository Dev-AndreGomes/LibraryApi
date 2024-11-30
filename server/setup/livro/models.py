from django.db import models

class Livro(models.Model):

    titulo = models.CharField(max_length=220, blank=False, null=False)
    autor = models.CharField(max_length=120, blank=False, null=False)
    genero = models.CharField(max_length=80, default='')
    ano_lancamento = models.IntegerField(blank=False, null=False)
    disponivel = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo
