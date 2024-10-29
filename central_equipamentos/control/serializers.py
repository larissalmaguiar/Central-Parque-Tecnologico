from rest_framework import serializers
from .models import Funcionarios, Equipamentos, Setor, Status,Fabricante, TipoManutencao, TipoEquipamentos, Transicao, Manutencao
class FuncionariosSerializer (serializers.ModelSerializer):
    class Meta():
        model = Funcionarios
        fields = '__all__'
class SetorSerializer (serializers.ModelSerializer):
    class Meta():
        model = Setor
        fields = '__all__'
class FabricanteSerializer (serializers.ModelSerializer):
    class Meta():
        model = Fabricante
        fields = '__all__'
class TipoManutencaoSerializer (serializers.ModelSerializer):
    class Meta():
        model = TipoManutencao
        fields = '__all__'
class TipoEquipamentosSerializer (serializers.ModelSerializer):
    class Meta():
        model = TipoEquipamentos
        fields = '__all__'
class EquipamentosSerializer (serializers.ModelSerializer):
    class Meta():
        model = Equipamentos
        fields = '__all__'
class StatusSerializer (serializers.ModelSerializer):
    class Meta():
        model = Status
        fields = '__all__'
class TransicaoSerializer (serializers.ModelSerializer):
    class Meta():
        model = Transicao
        fields = '__all__'
        
class ManutencaoSerializer (serializers.ModelSerializer):
    class Meta():
        model = Manutencao
        fields = '__all__'