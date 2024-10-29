document.addEventListener('DOMContentLoaded', function() {
    let setorId = null;
    let setorNome=null;
    const setorModal = document.getElementById('setor-modal-edit');
    const closeSetorModal = document.querySelector('.close');
    const setorNomeInput = document.getElementById('setor-nome-edit');
    const setorResponsavelSelect = document.getElementById('setor-responsavel-edit');
    const editSetorButton = document.getElementById('edit-setor-btn');
    const saveSetorButton = document.getElementById('save-setor-btn');

    // Função para preencher a lista de responsáveis
    // Função para preencher a lista de responsáveis
    function populateResponsavelSelect(selectedResponsavelId) {
        fetch('http://localhost:8000/Funcionarios/') // Rota para buscar os responsáveis
            .then(response => response.json())
            .then(data => {
                // Preencher o select com as opções de responsáveis
                setorResponsavelSelect.innerHTML = data.map(responsavel => 
                    `<option value="${responsavel.id}" ${responsavel.id === selectedResponsavelId ? 'selected' : ''}>
                        ${responsavel.nome}
                    </option>`
                ).join('');
            })
            .catch(error => console.error('Erro ao buscar responsáveis:', error));
    }

    // Habilitar edição dos campos ao clicar no botão "Editar"
    editSetorButton.addEventListener('click', () => {
        console.log("entrei no editor")
        setorNomeInput.readOnly = false; // Habilita a edição do nome
        setorResponsavelSelect.disabled = false; // Habilita a edição do responsável
        saveSetorButton.style.display = 'inline'; // Mostra o botão de salvar
    });


    // Função para abrir o modal com informações do setor
    function openSetorModal(setor) {
        setorId = setor.id; // Armazena o ID do setor
        setorNome=setor.nome;
        setorNomeInput.value = setor.nome; // Preenche o campo de nome do setor
        setorNomeInput.readOnly = true; // Deixa o campo de nome como somente leitura
        setorResponsavelSelect.disabled = true; // Deixa o select de responsável como somente leitura
        saveSetorButton.style.display = 'none'; // Esconde o botão de salvar
        setorModal.style.display = 'block'; // Mostra o modal

        // Preencher o campo de responsável com os dados da rota
        populateResponsavelSelect(setor.responsavel_id); // Preenche o select com o responsável atual
    }
    

    // Função para salvar as alterações
    document.getElementById('save-setor-btn').addEventListener('click', function() {
        const updatedSetor = {
            nome: setorNomeInput.value,
            responsavel: setorResponsavelSelect.value
        };

        // Verifica se o ID do setor está definido
        if (setorId) {
            console.log("Entrando na requisição PUT com setorId:", setorId);
            console.log("Dados a serem enviados:", updatedSetor);

            // Envia uma requisição PUT para atualizar o setor
            fetch(`http://localhost:8000/Setor/${setorId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSetor)
            })
            .then(response => {
                console.log(response.ok)
                if (response.ok) {
                    alert('Setor atualizado com sucesso!');
                } else {
                    response.json().then(data => console.log(data));  // Mostra detalhes do erro
                    alert('Erro ao atualizar setor.');
                }
            })
            .catch(error => {
                console.log(error)
                alert('Erro ao atualizar setor.');
            });
        }
    });

    // Fecha o modal ao clicar no "x"
    closeSetorModal.addEventListener('click', () => {
        setorModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target == setorModal) {
            setorModal.style.display = 'none';
        }
    });

    // Fetch para buscar os setores
    fetch('http://localhost:8000/Setor/')
        .then(response => response.json())
        .then(data => {
            const sortedSetores = data.sort((a, b) => a.nome.localeCompare(b.nome));
            console.log(sortedSetores);
            const setorList = document.getElementById('sector-list');

            // Preencher a lista de setores (ul) e adicionar evento de clique para abrir o modal
            setorList.innerHTML = sortedSetores.map(setor => 
                `<li><a href="#" class="setor-link" data-id="${setor.id}">${setor.nome}</a></li>`
            ).join('');

            // Adicionar eventos de clique para cada setor
            const setorLinks = document.querySelectorAll('.setor-link');
            setorLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    setorId = this.getAttribute('data-id'); // Armazena o ID do setor
                    console.log("Abrindo modal para setorId:", setorId);

                    // Usar find para buscar as informações do setor localmente
                    const setor = sortedSetores.find(s => s.id == setorId);
                    console.log(setor)
                    if (setor) {
                        openSetorModal(setor); // Abre o modal com as informações do setor
                    } else {
                        console.error('Setor não encontrado.');
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao buscar setores:', error));
        // Adicionar evento para o botão "Equipamentos do Setor"
    const equipamentosSetorButton = document.getElementById('equipamentos-setor-btn');
    equipamentosSetorButton.addEventListener('click', function() {
    if (setorId) {
        // Redireciona para uma nova página, passando o setorId como parâmetro na URL
        window.location.href = `equipamentos_setor.html?setorId=${setorId}&setorNome=${setorNome}`;
    } else {
        alert('Erro: ID do setor não encontrado.');
    }
    });

    
});



