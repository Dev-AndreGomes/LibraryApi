# Generated by Django 5.1.3 on 2024-11-30 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pessoa', '0002_pessoa_limite_emprestimos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pessoa',
            name='limite_emprestimos',
        ),
    ]
