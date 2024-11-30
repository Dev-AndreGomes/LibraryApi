from django.db import models

class Pessoa(models.Model):

    nome = models.CharField(max_length=120, blank=False, null=False)
    endereco = models.TextField(null=False, blank=False)
    email = models.EmailField(max_length=320, blank=False, null=False)
    telefone = models.CharField(max_length=15, blank=False, null=False)

    def __str__(self):
        return self.titulo
