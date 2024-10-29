document.addEventListener('DOMContentLoaded', function() {
    let funcionarioId = null;

    const funcionarioModal = document.getElementById('funcionario-modal-edit');
    const closeFuncionarioModal = document.querySelector('.close');
    const funcionarioNomeInput = document.getElementById('funcionario-nome-edit');
    const funcionarioMatriculaInput = document.getElementById('funcionario-matricula-edit');
    const editFuncionarioButton = document.getElementById('edit-funcionario-btn');
    const saveFuncionarioButton = document.getElementById('save-funcionario-btn');

    // Habilitar edição dos campos ao clicar no botão "Editar"
    editFuncionarioButton.addEventListener('click', () => {
        funcionarioNomeInput.readOnly = false; // Habilita a edição do nome
        funcionarioMatriculaInput.readOnly = false; // Habilita a edição da matrícula
        saveFuncionarioButton.style.display = 'inline'; // Mostra o botão de salvar
    });

    // Função para abrir o modal com informações do funcionário
    function openFuncionarioModal(funcionario) {
        funcionarioId = funcionario.id; // Armazena o ID do funcionário
        funcionarioNomeInput.value = funcionario.nome; // Preenche o campo de nome
        funcionarioNomeInput.readOnly = true; // Deixa o campo de nome como somente leitura
        funcionarioMatriculaInput.value = funcionario.matricula; // Preenche o campo de matrícula
        funcionarioMatriculaInput.readOnly = true; // Deixa o campo de matrícula como somente leitura
        saveFuncionarioButton.style.display = 'none'; // Esconde o botão de salvar
        funcionarioModal.style.display = 'block'; // Mostra o modal
    }

    // Função para salvar as alterações
    saveFuncionarioButton.addEventListener('click', function() {
        const updatedFuncionario = {
            nome: funcionarioNomeInput.value,
            matricula: funcionarioMatriculaInput.value
        };

        // Verifica se o ID do funcionário está definido
        if (funcionarioId) {
            console.log("Entrando na requisição PUT com funcionarioId:", funcionarioId);
            console.log("Dados a serem enviados:", updatedFuncionario);

            // Envia uma requisição PUT para atualizar o funcionário
            fetch(`http://localhost:8000/Funcionarios/${funcionarioId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFuncionario)
            })
            .then(response => {
                console.log("response",response)
                if (response.ok) {
                    alert('Funcionário atualizado com sucesso!');
                } else {
                    response.json().then(data => console.log(data));  // Mostra detalhes do erro
                    alert('Erro ao atualizar funcionário.');
                }
            })
            .catch(error => {
                console.log(response)
                console.log("error no console",error);
                alert('Erro ao atualizar funcionário.');
            });
        }
    });

    // Fecha o modal ao clicar no "x"
    closeFuncionarioModal.addEventListener('click', () => {
        funcionarioModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target == funcionarioModal) {
            funcionarioModal.style.display = 'none';
        }
    });

    // Fetch para buscar os funcionários e preencher a lista
    fetch('http://localhost:8000/Funcionarios/')
        .then(response => response.json())
        .then(data => {
            const sortedFuncionarios = data.sort((a, b) => a.nome.localeCompare(b.nome));
            console.log("funcionarios",sortedFuncionarios);

            const employeeList = document.getElementById('employee-list');

            // Preencher a lista de funcionários (ul) e adicionar evento de clique para abrir o modal
            employeeList.innerHTML = sortedFuncionarios.map(funcionario => 
                `<li><a href="#" class="funcionarios-link" data-id="${funcionario.id}">${funcionario.nome}</a></li>`
            ).join('');

            // Adicionar eventos de clique para cada funcionário
            const funcionarioLinks = document.querySelectorAll('.funcionarios-link');
            funcionarioLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    funcionarioId = this.getAttribute('data-id'); // Armazena o ID do funcionário
                    console.log("Abrindo modal para funcionarioId:", funcionarioId);

                    // Usar find para buscar as informações do funcionário localmente
                    const funcionario = sortedFuncionarios.find(f => f.id == funcionarioId);
                    console.log(funcionario);
                    if (funcionario) {
                        openFuncionarioModal(funcionario); // Abre o modal com as informações do funcionário
                    } else {
                        console.error('Funcionário não encontrado.');
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao buscar funcionários:', error));
});
