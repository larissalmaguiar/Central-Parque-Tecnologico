document.addEventListener('DOMContentLoaded', function() {
    //preencher campos do formulario de cadastro do equipamento
    fetch('http://localhost:8000/Fabricante/')
        .then(response => response.json())
        .then(data => {
            const sortedFabricante = data.sort((a, b) => a.nome.localeCompare(b.nome));
            const selectFabricante = document.getElementById('equipamento-fabricante');
            selectFabricante.innerHTML = data.map(fabricante => 
                `<option value="${fabricante.id}">${fabricante.nome}</option>`).join('');
        })
        .catch(error => console.error('Erro ao buscar fabricantes:', error));

    
    //FABRICANTE - EDIT 
    // Variável global para armazenar o ID do fabricante
    let fabricanteId = null;
    let fabricanteNome = null;
    const modal = document.getElementById('fabricante-modal-edit');
    const closeModal = document.querySelector('.close');
    const fabricanteNomeInput = document.getElementById('fabricante-nome');
    const editButton = document.getElementById('edit-fabricante-btn');
    const saveButton = document.getElementById('save-fabricante-btn');

    // Função para abrir o modal com informações do fabricante
    function openModal(fabricante) {
        fabricanteId = fabricante.id; // Armazena o ID do fabricante
        fabricanteNome = fabricante.nome;
        fabricanteNomeInput.value = fabricante.nome; // Preenche o campo de nome do fabricante
        fabricanteNomeInput.readOnly = true; // Deixa o campo de nome como somente leitura
        saveButton.style.display = 'none'; // Esconde o botão de salvar
        modal.style.display = 'block'; // Mostra o modal
    }

    // Função para habilitar a edição
    editButton.addEventListener('click', () => {
        fabricanteNomeInput.readOnly = false; // Habilita a edição do nome
        saveButton.style.display = 'inline'; // Mostra o botão de salvar
    });

    // Função para salvar as alterações em fabricante
    document.getElementById('save-fabricante-btn').addEventListener('click', function() {
        const updatedFabricante = {
            nome: fabricanteNomeInput.value
        };
        if (fabricanteId) {
            // Envia uma requisição PUT para atualizar o fabricante
            fetch(`http://localhost:8000/Fabricante/${fabricanteId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFabricante)
            })
            .then(response => {
                console.log(response.ok)
                if (response.ok) {
                    
                    alert('Fabricante atualizado com sucesso!');
                } 
                else {
                    response.json().then(data => console.log(data));  // Mostra detalhes do erro
                    alert('Erro ao atualizar fabricante.');
                }
            })
            .catch(error => {
                console.log(error)
                alert('Erro ao atualizar fabricante.');
            });
        }
        else{
            console.log("Nao teve id")
        }
    });

        // Fecha o modal ao clicar no "x"
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    //FABRICANTE - LIST - PRINCIPAL 

    // Fetch para buscar os fabricantes
    fetch('http://localhost:8000/Fabricante/')
        .then(response => response.json())
        .then(data => {
            const sortedStatus = data.sort((a, b) => a.nome.localeCompare(b.nome));
            console.log(sortedStatus);
            const employeeList = document.getElementById('fabricante-list');

            // Preencher a lista de fabricantes (ul) e adicionar evento de clique para abrir o modal
            employeeList.innerHTML = sortedStatus.map(fabricante => 
                `<li><a href="#" class="fabricante-link" data-id="${fabricante.id}">${fabricante.nome}</a></li>`
            ).join('');

            // Adicionar eventos de clique para cada fabricante
            const fabricanteLinks = document.querySelectorAll('.fabricante-link');
            fabricanteLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    fabricanteId = this.getAttribute('data-id'); // Armazena o ID do fabricante
                    // Usar find para buscar as informações do fabricante localmente
                    const fabricante = sortedStatus.find(fab => fab.id == fabricanteId);
                    if (fabricante) {
                        openModal(fabricante); // Abre o modal com as informações do fabricante
                    } else {
                        console.error('Fabricante não encontrado.');
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao buscar fabricantes:', error));
    const equipamentosSetorButton = document.getElementById('equipamentos-fabricante-btn');
    equipamentosSetorButton.addEventListener('click', function() {
    if (fabricanteId) {
        // Redireciona para uma nova página, passando o setorId como parâmetro na URL
        window.location.href = `equipamento_fabricante.html?fabricante_id=${fabricanteId}&fabricante_nome=${fabricanteNome}`;
    } else {
        alert('Erro: ID do setor não encontrado.');
    }
    });

    const equipamentosManButton = document.getElementById('equi-manu-btn');
    equipamentosManButton.addEventListener('click', function() {
        window.location.href = `equipamento_fabricante.html`;

    });
});






