from django.contrib import admin
from .models import Funcionarios, Setor, Status, TipoManutencao, Equipamentos, Manutencao, Transicao, Fabricante

# Register your models here.
admin.register(Funcionarios, Setor, Status, TipoManutencao, Equipamentos, Manutencao, Transicao, Fabricante)(admin.ModelAdmin)