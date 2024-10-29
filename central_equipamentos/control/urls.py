from .views import FuncionariosView, SetorView,FabricanteView, EquipamentosFabricanteView, EquipamentosSetorView, StatusView, ManutencaoView, EquipamentosView, TipoManutencaoView, TipoEquipamentosView, TransicaoView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('Funcionarios', FuncionariosView, basename = 'Funcionarios')
router.register('Setor', SetorView, basename ='Setor')
router.register('Fabricante', FabricanteView, basename ='Fabricante')
router.register('Status', StatusView, basename = 'Status')
router.register('Equipamentos', EquipamentosView, basename ='Equipamentos')
router.register('TipoManutencao', TipoManutencaoView, basename ='TipoManutencao')
router.register('TipoEquipamentos', TipoEquipamentosView, basename ='TipoEquipamentos')
router.register('Transicao', TransicaoView, basename ='Transicao')
router.register('Manutencao', ManutencaoView, basename ='Manutencao')
router.register('EquipamentoSetor', EquipamentosSetorView, basename ='EquipamentoSetor')
router.register('EquipamentoFabricante', EquipamentosFabricanteView, basename ='EquipamentoFabricante')
urlpatterns = router.urls
