document.addEventListener('DOMContentLoaded', function() {
    const manutencaoModal = document.getElementById('manutencao-modal'); // Modal
    const closeBtn = document.querySelector('.close'); // Botão de fechar


    const urlParams = new URLSearchParams(window.location.search);
    const equipamentoId = Number(urlParams.get('id')); // Extrai o equipamentoId da URL
    const calendarContainer = document.getElementById('calendar-container');
    const transicaoContainer = document.getElementById('transicao-container');
    const historicoTransicaoBtn = document.getElementById('historico-transicao-btn');
    const historicoManutencoesBtn = document.getElementById('historico-manutencoes-btn');
    if (equipamentoId) {
        // Exibe o calendário e esconde o histórico de transições
        historicoManutencoesBtn.addEventListener('click', function() {
            transicaoContainer.classList.add('hidden');  // Esconde transições
            transicaoContainer.classList.remove('visible');
            calendarContainer.classList.remove('hidden');  // Exibe o calendário

            // Inicializa o calendário apenas se ele ainda não tiver sido renderizado
            if (!calendarContainer.classList.contains('initialized')) {
                calendarContainer.classList.add('initialized'); // Evita inicializar novamente
                var calendarEl = document.getElementById('calendar');

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    locale: 'pt-br',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    buttonText: {
                        today: 'hoje',
                        month: 'mês',
                        week: 'semana',
                        day: 'dia',
                    },
                    height: 'auto',
                    navLinks: true,
                    selectable: true,
                    editable: true,
                    dayMaxEvents: true,
                    events: function(fetchInfo, successCallback, failureCallback) {
                        fetch(`http://localhost:8000/Manutencao/?equipamento_id=${equipamentoId}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erro ao buscar eventos');
                                }
                                return response.json();
                            })
                            .then(data => {
                                successCallback(data); // Retorna os eventos no formato correto
                            })
                            .catch(error => {
                                console.error('Erro ao buscar eventos:', error);
                                failureCallback(error);
                            });
                    },
                    eventClick: function(info) {
                        // Ao clicar no evento, abre o modal com as informações
                        document.getElementById('modal-title').textContent = info.event.title;
                        document.getElementById('modal-date').textContent = info.event.start.toLocaleDateString('pt-BR');
                        document.getElementById('modal-notes').textContent = info.event.extendedProps.anotacoes;

                        // Exibe o modal
                        var modal = document.getElementById("eventModal");
                        modal.style.display = "block";

                        // Fecha o modal ao clicar no "X"
                        var span = document.getElementsByClassName("close")[0];
                        span.onclick = function() {
                            modal.style.display = "none";
                        }

                        // Fecha o modal se o usuário clicar fora dele
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    }
                });

                calendar.render(); // Renderiza o calendário na página
            }
        });

        // Exibe o histórico de transições e esconde o calendário
        historicoTransicaoBtn.addEventListener('click', function() {
            calendarContainer.classList.add('hidden');  // Esconde o calendário
            console.log("cliquei");
            if (transicaoContainer.classList.contains('hidden')) {
                console.log('escondido');
                transicaoContainer.classList.remove('hidden');
                transicaoContainer.classList.add('visible');
            } else {
                console.log('achado')
                transicaoContainer.classList.remove('visible');
                transicaoContainer.classList.add('hidden');
            }
        });
    } else {
        console.error('ID do equipamento não encontrado na URL.');
    }
    // Função para abrir o modal
    function openModal() {
        manutencaoModal.style.display = 'block'; // Exibe o modal quando chamado
    }

    // Função para fechar o modal
    function closeModal() {
        manutencaoModal.style.display = 'none'; // Fecha o modal quando chamado
    }

    // Abrir o modal ao clicar no botão "Cadastrar Manutenções"
    document.getElementById('cadastrar-manutencoes-btn').addEventListener('click', function() {
        openModal(); // Chama a função para abrir o modal
    });

    // Fechar o modal ao clicar no botão "x"
    closeBtn.addEventListener('click', function() {
        closeModal(); // Chama a função para fechar o modal
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == manutencaoModal) {
            closeModal(); // Fecha o modal ao clicar fora dele
        }
    });

    // Função para preencher o select de equipamentos com o equipamentoId já selecionado e desabilitado
    function populateEquipamentoSelect() {
        fetch('http://localhost:8000/Equipamentos/')
            .then(response => response.json())
            .then(data => {
                const equipamentoSelect = document.getElementById('equipamento-id');
                
                // Preencher o select e garantir que o equipamentoId esteja selecionado e desabilitado
                equipamentoSelect.innerHTML = data.map(equipamento => 
                    `<option value="${equipamento.id}" ${equipamento.id === equipamentoId ? 'selected' : ''}>
                        ${equipamento.nome}
                    </option>`
                ).join('');

                // Desabilitar o select para que o usuário não possa alterar o equipamento selecionado
                equipamentoSelect.disabled = true;
            })
            .catch(error => console.error('Erro ao buscar equipamentos:', error));
    }

    // Função para preencher o select de tipos de manutenção
    function populateTipoManutencaoSelect() {
        fetch('http://localhost:8000/TipoManutencao/')
            .then(response => response.json())
            .then(data => {
                const tipoSelect = document.getElementById('tipo-manutencao');
                tipoSelect.innerHTML = data.map(tipo => 
                    `<option value="${tipo.id}">${tipo.nome}</option>`
                ).join('');
            })
            .catch(error => console.error('Erro ao buscar tipos de manutenção:', error));
    }

    // Preencher os selects ao carregar a página
    populateEquipamentoSelect();
    populateTipoManutencaoSelect();

    // Função para cadastrar a manutenção
    document.getElementById('manutencao-cadastrar-btn').addEventListener('click', function() {
        const manutencaoData = {
            equipamento_id: equipamentoId, // Usa o equipamentoId extraído da URL
            data: document.getElementById('data-manutencao').value,
            tipo: document.getElementById('tipo-manutencao').value,
            anotacoes: document.getElementById('anotacoes').value
        };

        // Enviar requisição POST para cadastrar a manutenção
        fetch('http://localhost:8000/Manutencao/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(manutencaoData)
        })
        .then(response => {
            if (response.ok) {
                alert('Manutenção cadastrada com sucesso!');
                closeModal(); // Fecha o modal após o cadastro com sucesso
                document.getElementById('manutencao-form').reset(); // Reseta o formulário após o sucesso
            } else {
                response.json().then(data => console.log(data)); // Mostra detalhes do erro
                alert('Erro ao cadastrar manutenção.');
            }
        })
        .catch(error => console.error('Erro ao cadastrar manutenção:', error));
    });

    // Inicialmente, o modal é fechado
    closeModal();



    

    if (!historicoTransicaoBtn) {
        console.error('Botão histórico-transicao-btn não encontrado.');
        return;
    }
});
