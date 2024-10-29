document.getElementById('funcionario-btn').addEventListener('click', function() {
    document.getElementById('funcionario-modal').style.display = 'block';
});
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('funcionario-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('funcionario-modal')) {
        document.getElementById('funcionario-modal').style.display = 'none';
    }
});
// FUNCIONARIOS - CADASTRAR 
document.getElementById('funcionario-cadastrar-btn').addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;
    
    // Construa o objeto no formato desejado
    const data1 = {
        nome: nome,
        matricula: matricula
    };
    console.log(data1)
    fetch('http://localhost:8000/Funcionarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1) // Converta o objeto para JSON
    })
    .then(response =>{ 
        if (response.ok){
            console.log('deu bom', response)
            alert('Funcionário cadastrado com sucesso!');
            document.getElementById('funcionario-modal').style.display = 'none';
            document.getElementById('funcionario-form').reset();
        }
        else{
            console.log("error",response);
            alert('Erro ao cadastrar funcionário!');
        }
        
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

const modal = document.getElementById('funcionario-modal');

        // Pegue o botão de fechar
const closeModal = document.querySelector('.close');

// Adicione um event listener para fechar o modal ao clicar no 'X'
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Opcional: feche o modal ao clicar fora dele
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar e preencher a lista de funcionários em equipamentos
    fetch('http://localhost:8000/Funcionarios')
        .then(response => response.json())
        .then(data => {
            // Ordenar os funcionários alfabeticamente
            const sortedFuncionarios = data.sort((a, b) => a.nome.localeCompare(b.nome));
            // Preencher o campo de seleção (select)
            const select = document.getElementById('setor-responsavel');
            select.innerHTML = sortedFuncionarios.map(funcionario => 
                `<option value="${funcionario.id}">${funcionario.nome}</option>`).join('');
        })
        .catch(error => console.error('Erro ao buscar funcionários:', error));

        
        
    });