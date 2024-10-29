document.addEventListener("DOMContentLoaded", function() {
    // Função para buscar dados de equipamentos de um determinado setor
    function fetchEquipamentos(setorId, setorNome) {
        // Atualiza o título da página com o nome do setor
        const pageTitle = document.querySelector('header h1');
        pageTitle.textContent = `Equipamentos do Setor: ${setorNome}`;

        // Defina a URL da sua API aqui
        const apiUrl = `http://localhost:8000/EquipamentoSetor/?setor_id=${setorId}`;

        // Faz a requisição à API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar equipamentos');
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(data => {
                console.log(data);
                preencherTabela(data); // Chama a função para preencher a tabela com os dados recebidos
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    // Função para preencher a tabela com os dados recebidos da API
    function preencherTabela(equipamentos) {
        const tabelaBody = document.getElementById('transicao-setor-list');
        tabelaBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        equipamentos.forEach(equipamento => {
            // Cria uma nova linha na tabela
            const row = document.createElement('tr');

            // Cria células para cada coluna (equipamento, status operacional, fabricante)
            const equipamentoCell = document.createElement('td');
            equipamentoCell.textContent = equipamento.nome;

            const statusCell = document.createElement('td');
            statusCell.textContent = equipamento.status_operacional;

            const serieCell = document.createElement('td');
            serieCell.textContent = equipamento.numero_serie;

            const fabricanteCell = document.createElement('td');
            fabricanteCell.textContent = equipamento.fabricante;

            // Adiciona as células à linha
            row.appendChild(equipamentoCell);
            row.appendChild(statusCell);
            row.appendChild(serieCell);
            row.appendChild(fabricanteCell);

            // Adiciona a linha à tabela
            tabelaBody.appendChild(row);
        });
    }

    // Obtém o setorId e o setorNome da URL
    const urlParams = new URLSearchParams(window.location.search);
    const setorId = Number(urlParams.get('setorId'));
    const setorNome = urlParams.get('setorNome');  // Nome do setor na URL

    // Chama a função passando o ID e o nome do setor
    fetchEquipamentos(setorId, setorNome);
});
