from django.db import models
import datetime 
from django.utils.translation import gettext as _
# Create your models here.

class Funcionarios (models.Model):
    nome = models.CharField(max_length=50)
    matricula = models.CharField(max_length=50, unique=True)
    activate = models.BooleanField(default=True, null= True)
class Setor (models.Model):
    nome = models.CharField(max_length=50)
    responsavel = models.ForeignKey("Funcionarios", on_delete=models.RESTRICT)
class Fabricante (models.Model):
    nome = models.CharField(max_length=50)
class Status (models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=400, default=None, null=True)
class TipoManutencao (models.Model):
    nome = models.CharField(max_length=50)
    background_color = models.CharField(max_length=50)
class TipoEquipamentos (models.Model):
    nome = models.CharField(max_length=50)
class Equipamentos (models.Model):
    nome = models.CharField(max_length=50)
    fabricante_id = models.ForeignKey("Fabricante", on_delete=models.RESTRICT, null= True, default = None)
    tipo_id = models.ForeignKey(TipoEquipamentos, on_delete=models.RESTRICT, null= True, default = None)
    modelo= models.CharField(max_length=50)
    numero_serie = models.CharField(max_length=50)
    data_aquisicao = models.DateField(_("Date"), null=True)
    data_garantia = models.DateField(_("Date"), null=True)
    tag_ident= models.CharField( max_length=50)
    status_operacional = models.ForeignKey(Status, on_delete=models.RESTRICT)
class Manutencao (models.Model):
    equipamento_id = models.ForeignKey(Equipamentos, on_delete=models.RESTRICT)
    data = models.DateField(_("Date"), default = datetime.date.today)
    tipo = models.ForeignKey(TipoManutencao, on_delete=models.RESTRICT)
    anotacoes = models.CharField( max_length=150)
    
class Transicao (models.Model):
    setor_incio = models.ForeignKey(Setor, on_delete=models.RESTRICT,  related_name="transicao_inicial")  
    setor_final = models.ForeignKey(Setor, on_delete=models.RESTRICT,  related_name="transicao_final")  
    responsavel = models.ForeignKey("Funcionarios", on_delete=models.RESTRICT)
    data_entrada = models.DateTimeField(_("Date"))
    data_saida = models.DateTimeField(_("Date"), null=True)
    equipamento_id = models.ForeignKey(Equipamentos, on_delete=models.RESTRICT)