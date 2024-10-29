
// Captura o ID do equipamento da URL
const urlParams = new URLSearchParams(window.location.search);
const equipamentoId = Number(urlParams.get('id'));
function formatDate(dataString) {
    const data = new Date(dataString);

    // Extrair dia, mês e ano em UTC
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Mês é zero-indexado
    const ano = data.getUTCFullYear();

    // Extrair horas e minutos em UTC
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');

    // Retorna no formato desejado com ou sem horas
    if (dataString.includes('T')) {
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    } else {
        return `${dia}/${mes}/${ano}`;
    }
}



// Requisição para buscar detalhes do equipamento
fetch(`http://localhost:8000/Equipamentos/`)
    .then(response => response.json())
    .then(data1 => {
        const detalhesContainer = document.getElementById('equipamento-detalhes');
        console.log(data1)
        console.log(equipamentoId)
        const data = data1.find(item => item.id === equipamentoId);
        console.log(data.data_aquisicao);
        console.log(data.data_garantia);
        detalhesContainer.innerHTML = `
            <h2>Informações do Equipamento</h2>
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Tipo de Equipamento:</strong> ${data.tipo_id__nome}</p>

            <p><strong>Fabricante:</strong> ${data.fabricante_id__nome ? data.fabricante_id__nome : "Não identificado"}</p>
            <p><strong>Modelo:</strong> ${data.modelo}</p>
            <p><strong>Número de Série:</strong> ${data.numero_serie}</p>
            <p><strong>Data de Aquisição:</strong> ${formatDate(data.data_aquisicao)}</p>
            <p><strong>Data de Garantia:</strong> ${formatDate(data.data_garantia)}</p>
            <p><strong>Status:</strong> ${data.status_operacional__nome}</p>
        `;
    })
    .catch(error => console.error('Erro ao buscar detalhes do equipamento:', error));

// Requisição para buscar o histórico de transições de setor
fetch(`http://localhost:8000/Transicao/?equipamento_id=${equipamentoId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        const transicaoSetorList = document.getElementById('transicao-setor-list');

        transicaoSetorList.innerHTML = data.map(transicao => {
            var dataEntradaFormatada = formatDate(transicao.data_entrada);
            console.log(dataEntradaFormatada)
            var dataSaidaFormatada = formatDate(transicao.data_saida);
            console.log(dataSaidaFormatada)
            var dataEntrada = new Date(transicao.data_entrada);
            var dataSaida = new Date(transicao.data_saida);
            var difTime = dataSaida - dataEntrada
            console.log(difTime)
            var difHours = Math.floor(difTime / (1000 * 60 * 60)); // Converte milissegundos para horas

            // Gera a linha da tabela
            return `
            <tr>
                <td>${transicao.setor_incio__nome}</td>
                <td>${dataEntradaFormatada}</td>
                <td>${transicao.setor_final__nome}</td>
                <td>${dataSaidaFormatada}</td>
                <td>${transicao.responsavel__nome}</td>
                <td>${difHours} horas</td>
            </tr>
            `;
        }).join('');  // `.join('')` para combinar o array de strings HTML em um único bloco
    })
    .catch(error => console.error('Erro ao buscar transições de setor:', error));

// Ações dos botões
