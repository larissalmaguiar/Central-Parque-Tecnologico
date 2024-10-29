document.addEventListener('DOMContentLoaded', function() {
    // Captura os parâmetros da URL


    // Verifica se o equipamentoId está presente na URL
    
    const urlParams = new URLSearchParams(window.location.search);
    //const equipamentoNome = null;
    const equipamento_id = urlParams.get('id'); // Obtém o nome do equipamento da URL]
    console.log(equipamento_id)
    fetch(`http://localhost:8000/Equipamentos/${equipamento_id}`)
    .then(response => {
        // Verifica se a resposta está OK
        if (!response.ok) {
            throw new Error('Erro ao buscar os detalhes do equipamento');
        }
        return response.json(); // Converte a resposta em JSON
    })
    .then(data => {
        console.log(data.nome); // Exibe os dados no console
        const equipamentoNome= data.nome
        const pageTitle = document.getElementById('page-title');
        pageTitle.textContent = `Histórico de Manutenções do Equipamento ${equipamentoNome}`;
    })
    .catch(error => console.error('Erro ao buscar detalhes do equipamento:', error));


        // Inicializa o calendário
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
            var equipamentoId = equipamento_id; // Exemplo de ID de equipamento
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

            // Popula o modal com as informações do evento
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

            // Fecha o modal se o usuário clicar fora da caixa modal
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    });

    calendar.render();
    
});
