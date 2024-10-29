# Generated by Django 5.1 on 2024-09-25 20:38

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fabricante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Funcionarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('matricula', models.CharField(max_length=50, unique=True)),
                ('activate', models.BooleanField(default=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('descricao', models.CharField(default=None, max_length=400, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TipoEquipamentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TipoManutencao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('background_color', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Equipamentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('modelo', models.CharField(max_length=50)),
                ('numero_serie', models.CharField(max_length=50)),
                ('data_aquisicao', models.DateField(null=True, verbose_name='Date')),
                ('data_garantia', models.DateField(null=True, verbose_name='Date')),
                ('tag_ident', models.CharField(max_length=50)),
                ('fabricante_id', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='control.fabricante')),
                ('status_operacional', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.status')),
                ('tipo_id', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='control.tipoequipamentos')),
            ],
        ),
        migrations.CreateModel(
            name='Setor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('responsavel', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.funcionarios')),
            ],
        ),
        migrations.CreateModel(
            name='Manutencao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField(default=datetime.date.today, verbose_name='Date')),
                ('anotacoes', models.CharField(max_length=150)),
                ('equipamento_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.equipamentos')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.tipomanutencao')),
            ],
        ),
        migrations.CreateModel(
            name='Transicao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_entrada', models.DateTimeField(verbose_name='Date')),
                ('data_saida', models.DateTimeField(null=True, verbose_name='Date')),
                ('equipamento_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.equipamentos')),
                ('responsavel', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='control.funcionarios')),
                ('setor_final', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='transicao_final', to='control.setor')),
                ('setor_incio', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='transicao_inicial', to='control.setor')),
            ],
        ),
    ]
