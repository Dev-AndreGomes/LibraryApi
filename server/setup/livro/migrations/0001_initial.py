# Generated by Django 5.1.3 on 2024-11-28 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Livro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=120)),
                ('autor', models.CharField(max_length=80)),
                ('genero', models.CharField(default='', max_length=100)),
                ('ano_lancamento', models.IntegerField()),
            ],
        ),
    ]
