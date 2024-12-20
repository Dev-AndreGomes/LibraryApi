# Generated by Django 5.1.3 on 2024-11-29 03:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('livro', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='livro',
            name='disponivel',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='livro',
            name='autor',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='livro',
            name='genero',
            field=models.CharField(default='', max_length=80),
        ),
        migrations.AlterField(
            model_name='livro',
            name='titulo',
            field=models.CharField(max_length=220),
        ),
    ]
