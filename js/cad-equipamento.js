// Abrir modal de cadastro de equipamento
document.getElementById('equipamento-btn').addEventListener('click', function() {
    const modal = document.getElementById('equipamento-modal');
    modal.style.display = 'block';

    // Populando o select de Tipo de Equipamento
    fetch('http://localhost:8000/TipoEquipamentos/')
        .then(response => response.json())
        .then(data => {
            const sortedTipos = data.sort((a, b) => a.nome.localeCompare(b.nome));
            const selectTipo = document.getElementById('equipamento-tipo');
            selectTipo.innerHTML = sortedTipos.map(tipo => 
                `<option value="${tipo.id}">${tipo.nome}</option>`).join('');
        })
        .catch(error => console.error('Erro ao buscar tipos de equipamentos:', error));

    // Populando o select de Status Operacional
    fetch('http://localhost:8000/Status/')
        .then(response => response.json())
        .then(data => {
            const sortedStatus = data.sort((a, b) => a.nome.localeCompare(b.nome));
            const selectStatus = document.getElementById('equipamento-status');
            selectStatus.innerHTML = data.map(status => 
                `<option value="${status.id}">${status.nome}</option>`).join('');
        })
        .catch(error => console.error('Erro ao buscar status de equipamentos:', error));
    // Populando o select de Fabricante
    

});

// Fechar modal de equipamento
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('equipamento-modal').style.display = 'none';
});

// Fechar modal se clicar fora da modal
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('equipamento-modal')) {
        document.getElementById('equipamento-modal').style.display = 'none';
    }
});

// Cadastro de equipamento
document.getElementById('equipamento-cadastrar-btn').addEventListener('click', function() {
    const nome = document.getElementById('equipamento-nome').value;
    const tipo = document.getElementById('equipamento-tipo').value;
    const fabricante = document.getElementById('equipamento-fabricante').value;
    const modelo = document.getElementById('equipamento-modelo').value;
    const numeroSerie = document.getElementById('equipamento-nserie').value;
    const dataAquisicao = document.getElementById('equipamento-data-aquisicao').value;
    const dataGarantia = document.getElementById('equipamento-data-garantia').value;
    const tag = document.getElementById('equipamento-tag').value;
    const status = document.getElementById('equipamento-status').value;

    const data = {
        nome: nome,
        tipo_id: tipo,
        fabricante_id:fabricante,
        modelo: modelo,
        numero_serie: numeroSerie,
        data_aquisicao: dataAquisicao,
        data_garantia: dataGarantia,
        tag_ident: tag,
        status_operacional: status
    };

    fetch('http://localhost:8000/Equipamentos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(response)
        if(response.ok){
            alert('Equipamento cadastrado com sucesso!');
            document.getElementById('equipamento-modal').style.display = 'none';
            document.getElementById('equipamento-form').reset();
        }
        else 
        {
            alert('Erro ao cadastrar equipamento');
        }

    })
    .catch(error => {
        console.error('Erro ao cadastrar equipamento:', error);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/Equipamentos/')
        .then(response => response.json())
        .then(data => {
            const sortedEquipamentos = data.sort((a, b) => a.nome.localeCompare(b.nome));
            // Preencher a lista de equipamentos (ul)
            const equipmentList = document.getElementById('equipment-list');
            equipmentList.innerHTML = sortedEquipamentos.map(equipamento => 
                `<li><a href="detalhes-equipamento.html?id=${equipamento.id}">${equipamento.nome}</a></li>`).join('');
        })
        .catch(error => console.error('Erro ao buscar status de equipamentos:', error));
});