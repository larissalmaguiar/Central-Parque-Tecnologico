from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FuncionariosSerializer, EquipamentosSerializer, ManutencaoSerializer, StatusSerializer, SetorSerializer,TipoEquipamentosSerializer, TransicaoSerializer, FabricanteSerializer, TipoManutencaoSerializer
from .models import Funcionarios, Setor, Equipamentos,Fabricante, Manutencao, Status, TipoManutencao, TipoEquipamentos, Transicao
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
import json 
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Count, Q
# Create your views here.
class FuncionariosView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put']
    serializer_class = FuncionariosSerializer
    queryset = Funcionarios.objects.all()
    def list (self, request):
        try:
            funcionarios = list(Funcionarios.objects.filter(activate=True).values('nome', 'matricula', 'id', 'activate'))
            return JsonResponse (funcionarios, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
    def create (self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            new_funcionario = Funcionarios(nome = data.get('nome'), matricula = data.get('matricula')) 
            print ("data ", data)
            print(data.get('nome'))
            new_funcionario.save()
            return JsonResponse({'mensagem': f'Dados recebidos'}, safe = False)
        except Exception as error:
            return JsonResponse(error, safe=False)
                                    
    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            update_fields = {}
            if 'activate' in data:
                update_fields['activate'] = data.get('activate')
            if 'nome' in data:
                update_fields['nome'] = data.get('nome')
            if 'matricula' in data:
                update_fields['matricula'] = data.get('matricula')
            if update_fields:
                Funcionarios.objects.filter(id=kwargs['pk']).update(**update_fields)
                return JsonResponse({'mensagem': 'Dados atualizados'})
            return JsonResponse({'mensagem': 'Nenhum dado para atualizar'}, safe=False)
        except Exception as error:
            return JsonResponse(error, safe=False)

        
class SetorView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put']
    serializer_class = SetorSerializer
    queryset = Setor.objects.all()
    def list (self, request):
        try:
            setores_return = []
            setores = list(Setor.objects.values('nome', 'responsavel', 'id'))
            for setor in setores:
                responsavel = Funcionarios.objects.get(id=setor['responsavel'])
                print(responsavel.nome)
                setores_return.append({
                    'id': setor['id'],
                    'nome': setor['nome'],
                    'responsavel_id': setor['responsavel'],
                    'responsavel_nome': responsavel.nome
                })
            print(setores_return)
            return JsonResponse (setores_return, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
    def create (self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            responsavel = Funcionarios.objects.get(id=data.get('responsavel'))
            new_setor = Setor(nome = data.get('nome'), responsavel =responsavel) 
            new_setor.save()
            return JsonResponse({'mensagem': f'Dados recebidos'}, safe = False)
        except Exception as error:
            return JsonResponse(error, safe=False)
                                    
    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            setor_up = Setor.objects.filter(id=kwargs['pk']).update(nome = data.get('nome'), responsavel = data.get('responsavel'))
            return JsonResponse({'mensagem': 'Dados atualizados'})
        except Exception as error:
            return JsonResponse(error, safe = False)
        
class FabricanteView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put']
    serializer_class = FabricanteSerializer
    queryset = Fabricante.objects.all()
    def list (self, request):
        try:
            fabrincantes = list(Fabricante.objects.values('nome', 'id'))
            return JsonResponse (fabrincantes, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
    def create (self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            new_setor = Fabricante(nome = data.get('nome')) 
            print(new_setor)
            new_setor.save()
            return JsonResponse({'mensagem': f'Dados recebidos'}, safe = False)
        except Exception as error:
            return JsonResponse(error, safe=False)
                                    
    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            Fabricante.objects.filter(id=kwargs['pk']).update(nome = data.get('nome'))
            print(data)
            return JsonResponse({'mensagem': 'Dados atualizados'}, status = 204)
        except Exception as error:
            print(error)
            return JsonResponse(error, safe = False)

class TipoManutencaoView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get']
    serializer_class = TipoManutencaoSerializer
    queryset = TipoManutencao.objects.all()
    def list (self, request):
        try:
            tipo_manutencao = list(TipoManutencao.objects.values('nome', 'id'))
            return JsonResponse (tipo_manutencao, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
class TipoEquipamentosView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get']
    serializer_class = TipoEquipamentosSerializer
    queryset = TipoEquipamentos.objects.all()
    def list (self, request):
        try:
            tipo_equipamentos = list(TipoEquipamentos.objects.values('nome', 'id'))
            return JsonResponse(tipo_equipamentos, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
class StatusView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get']
    serializer_class = StatusSerializer
    queryset = Status.objects.all()
    def list (self, request):
        try:
            status = list(Status.objects.values('nome', 'id'))
            return JsonResponse(status, safe = False )
        except Exception as error:
            return JsonResponse(error, safe = False)
        

class EquipamentosView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put', 'head']
    serializer_class = EquipamentosSerializer
    queryset = Equipamentos.objects.all()
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('fabricante_id', openapi.IN_QUERY, description="ID do fabricante", type=openapi.TYPE_STRING),
            openapi.Parameter('tipo_id', openapi.IN_QUERY, description="ID do tipo", type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request):
        try:
            tipo_id = request.GET.get('tipo_id')
            fabricante_id = request.GET.get('fabricante_id')
            
            # Filtrando Equipamentos com base nos parâmetros fornecidos
            if tipo_id and not fabricante_id:
                equipamentos = Equipamentos.objects.filter(tipo_id=tipo_id).select_related('fabricante_id', 'tipo_id', 'status_operacional').values(
                    'id', 'nome', 'modelo', 'numero_serie', 'data_aquisicao', 'data_garantia', 'tag_ident','fabricante_id', 'tipo_id','status_operacional',
                    'fabricante_id__nome', 'tipo_id__nome', 'status_operacional__nome'
                )
            elif fabricante_id and not tipo_id:
                equipamentos = Equipamentos.objects.filter(fabricante_id=fabricante_id).select_related('fabricante_id', 'tipo_id', 'status_operacional').values(
                    'id', 'nome', 'modelo', 'numero_serie', 'data_aquisicao', 'data_garantia', 'tag_ident','fabricante_id', 'tipo_id','status_operacional',
                    'fabricante_id__nome', 'tipo_id__nome', 'status_operacional__nome'
                )
            elif fabricante_id and tipo_id:
                equipamentos = Equipamentos.objects.filter(fabricante_id=fabricante_id, tipo_id=tipo_id).select_related('fabricante_id', 'tipo_id', 'status_operacional').values(
                    'id', 'nome', 'modelo', 'numero_serie', 'data_aquisicao', 'data_garantia', 'tag_ident',
                    'fabricante_id', 'tipo_id','status_operacional','fabricante_id__nome', 'tipo_id__nome', 'status_operacional__nome'
                )
            else:
                equipamentos = Equipamentos.objects.all().select_related('fabricante_id', 'tipo_id', 'status_operacional').values(
                    'id', 'nome', 'modelo', 'numero_serie', 'data_aquisicao', 'data_garantia', 'tag_ident',
                    'fabricante_id', 'fabricante_id__nome', 'tipo_id', 'tipo_id__nome', 'status_operacional','status_operacional__nome'
                )
            
            equipamentos_return = list(equipamentos) if equipamentos else []
            
            return JsonResponse(equipamentos_return, safe=False)
        except Exception as error:
            return JsonResponse({'error': str(error)}, safe=False)



    def create(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))

            # Obtém as referências para as chaves estrangeiras
            fabricante = None if data.get('fabricante_id', None) == None else Fabricante.objects.get(id=data.get('fabricante_id'))
            print("Fabricante",fabricante)
            fabricante = fabricante if fabricante != [] else None
            tipo = TipoEquipamentos.objects.get(id=data.get('tipo_id'))
            status_operacional = Status.objects.get(id=data.get('status_operacional'))

            # Cria o novo equipamento com os dados recebidos
            new_equipamento = Equipamentos(
                nome=data.get('nome'),
                fabricante_id=fabricante,
                tipo_id=tipo,
                modelo=data.get('modelo'),
                numero_serie=data.get('numero_serie'),
                data_aquisicao=data.get('data_aquisicao'),
                data_garantia=data.get('data_garantia'),
                tag_ident=data.get('tag_ident'),
                status_operacional=status_operacional
            )
            
            # Salva o novo equipamento no banco de dados
            new_equipamento.save()

            return JsonResponse({'mensagem': 'Equipamento criado com sucesso'}, safe=False)
        
        except Fabricante.DoesNotExist:
            return JsonResponse({'erro': 'Fabricante não encontrado'}, safe=False)
        except TipoEquipamentos.DoesNotExist:
            return JsonResponse({'erro': 'Tipo de Equipamento não encontrado'}, safe=False)
        except Status.DoesNotExist:
            return JsonResponse({'erro': 'Status Operacional não encontrado'}, safe=False)
        except Exception as error:
            return JsonResponse({'erro': str(error)}, safe=False)


class TransicaoView (viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put', 'head']
    serializer_class = TransicaoSerializer
    queryset = Transicao.objects.all()
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('equipamento_id', openapi.IN_QUERY, description="ID do equipamento", type=openapi.TYPE_STRING)
        ]
    )
    def list(self, request):
        try:
            
            equipamento_id = request.GET.get('equipamento_id')
            equipamentos = Transicao.objects.filter(equipamento_id= equipamento_id).select_related('setor_incio', 'setor_final', 'responsavel').values(
                    'id', 'setor_incio', 'setor_incio__nome',  'setor_final','setor_final__nome', 'data_entrada', 'data_saida','responsavel','responsavel__nome'
                )
            
            equipamentos_return = list(equipamentos) if equipamentos else []
            
            return JsonResponse(equipamentos_return, safe=False)
        except Exception as error:
            return JsonResponse({'error': str(error)}, safe=False)


class ManutencaoView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put']
    serializer_class = ManutencaoSerializer
    queryset = Manutencao.objects.all()

    # Sobrescrevendo a list para personalizar a resposta JSON
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('equipamento_id', openapi.IN_QUERY, description="ID do equipamento", type=openapi.TYPE_STRING)
        ]
    )
    def list(self, request):
        try:
            # Filtra as manutenções pelo equipamento_id passado na URL
            equipamento_id = request.GET.get('equipamento_id')
            manutencoes = Manutencao.objects.filter(equipamento_id=equipamento_id)

            # Mapeia os dados para o formato esperado pelo FullCalendar
            eventos = [
                {
                    'id': manutencao.id,
                    'title': manutencao.tipo.nome,  # O nome da tipo de manutenção será o título
                    'start': manutencao.data.strftime('%Y-%m-%d'),  # Data será o campo start no formato 'YYYY-MM-DD'
                    'backgroundColor': manutencao.tipo.background_color,  # Adiciona o campo background-color da tabela TipoManutencao
                    'extendedProps': {
                        'anotacoes': manutencao.anotacoes,
                        'equipamento_id': manutencao.equipamento_id.id,  # Inclui o ID do equipamento nas propriedades extras
                    }
                }
                for manutencao in manutencoes
            ]
            
            # Retorna os eventos em formato JSON
            return JsonResponse(eventos, safe=False)
        except Exception as error:
            return JsonResponse({'error': str(error)}, safe=False)

    # Sobrescrevendo create para personalizar a criação de uma nova manutenção
    def create(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            
            # Criando uma nova manutenção a partir dos dados recebidos
            nova_manutencao = Manutencao(
                equipamento_id_id=data.get('equipamento_id'),
                data=data.get('data'),
                tipo=TipoManutencao.objects.get(id=data.get('tipo')),
                anotacoes=data.get('anotacoes')
            )
            nova_manutencao.save()

            return JsonResponse({'mensagem': 'Manutenção criada com sucesso'}, safe=False)
        except Exception as error:
            return JsonResponse({'error': str(error)}, safe=False)

    # Sobrescrevendo update para atualizar uma manutenção existente
    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            
            # Atualizando os campos de manutenção com base no ID
            Manutencao.objects.filter(id=kwargs['pk']).update(
                equipamento_id_id=data.get('equipamento_id'),
                data=data.get('data'),
                tipo_id=data.get('tipo_id'),
                anotacoes=data.get('anotacoes')
            )

            return JsonResponse({'mensagem': 'Manutenção atualizada com sucesso'}, status=204)
        except Exception as error:
            return JsonResponse({'error': str(error)}, safe=False)
        


class EquipamentosSetorView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  # Defina suas permissões aqui
    http_method_names = ['get']
    serializer_class = EquipamentosSerializer
    queryset = Transicao.objects.all()
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('setor_id', openapi.IN_QUERY, description="ID do setor", type=openapi.TYPE_STRING)
        ]
    )
    def list(self, request):
        try:
            #data = json.loads(request.body.decode('utf-8'))
            setor_id = request.GET.get('setor_id')
            print("setor", setor_id)
            transicoes = Transicao.objects.filter(setor_final_id=setor_id).values_list('equipamento_id', flat=True).distinct()
            if not transicoes.exists():
                return JsonResponse({"error": "Nenhuma transição encontrada para o setor fornecido"}, status=404)
            equipamentos_data = []
            for transicao in transicoes:
                equipamento =Equipamentos.objects.get(id=transicao)
                equipamento_data1 = {
                    "nome": equipamento.nome,
                    "fabricante": equipamento.fabricante_id.nome if equipamento.fabricante_id else None,
                    "tipo": equipamento.tipo_id.nome if equipamento.tipo_id else None,
                    "modelo": equipamento.modelo,
                    "numero_serie": equipamento.numero_serie,
                    "data_aquisicao": equipamento.data_aquisicao,
                    "data_garantia": equipamento.data_garantia,
                    "tag_ident": equipamento.tag_ident,
                    "status_operacional": equipamento.status_operacional.nome  # Acesse o nome do status corretamente
                }
                print(equipamento)
                equipamentos_data.append(equipamento_data1)
                
                # Serializa as informações do equipamento


            # Retorna os dados dos equipamentos como JSON
            return JsonResponse(equipamentos_data, safe=False, status=200)
        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
        
        

class EquipamentosFabricanteView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    http_method_names = ['get']
    serializer_class = EquipamentosSerializer

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('fabricante_id', openapi.IN_QUERY, description="ID do fabricante", type=openapi.TYPE_STRING)
        ]
    )
    def list(self, request):
        try:
            fabricante_id = request.GET.get('fabricante_id')
            print(fabricante_id)
            # Filtra os equipamentos pelo fabricante_id
            if fabricante_id != 'null':
                equipamentos = Equipamentos.objects.filter(fabricante_id=fabricante_id)
            else:
                equipamentos = Equipamentos.objects.all()
            # Adiciona contagem de manutenções por tipo
            equipamentos = equipamentos.annotate(
                preditiva_count=Count('manutencao', filter=Q(manutencao__tipo__nome="Preditiva")),
                preventiva_count=Count('manutencao', filter=Q(manutencao__tipo__nome="Preventiva")),
                corretiva_count=Count('manutencao', filter=Q(manutencao__tipo__nome="Corretiva")),
                total_manutencoes=Count('manutencao')
            ).order_by('-total_manutencoes')  # Ordena pelo maior número total de manutenções

            equipamentos_data = []
            for equipamento in equipamentos:
                equipamento_data = {
                    "nome": equipamento.nome,
                    "fabricante": equipamento.fabricante_id.nome if equipamento.fabricante_id else None,
                    "tipo": equipamento.tipo_id.nome if equipamento.tipo_id else None,
                    "modelo": equipamento.modelo,
                    "numero_serie": equipamento.numero_serie,
                    "data_aquisicao": equipamento.data_aquisicao,
                    "data_garantia": equipamento.data_garantia,
                    "tag_ident": equipamento.tag_ident,
                    "status_operacional": equipamento.status_operacional.nome,  # Acessa o nome do status corretamente
                    "preditiva_count": equipamento.preditiva_count,
                    "preventiva_count": equipamento.preventiva_count,
                    "corretiva_count": equipamento.corretiva_count,
                    "total_manutencoes": equipamento.total_manutencoes
                }
                equipamentos_data.append(equipamento_data)

            return JsonResponse(equipamentos_data, safe=False, status=200)

        except Exception as error:
            return JsonResponse({"error": str(error)}, status=500)
