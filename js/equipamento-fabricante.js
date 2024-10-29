document.addEventListener("DOMContentLoaded", function () {
    // Função para buscar e preencher a tabela com os dados dos equipamentos
    async function fetchEquipamentos(fabricanteId, fabricanteNome) {
        try {
            // Atualiza o título da página com o nome do fabricante
            const pageTitle = document.querySelector('header h1');
            if (fabricanteNome =='')
            {
                pageTitle.textContent = `Total de Manutenções por Equipamento`;
            }
            else   pageTitle.textContent = `Equipamentos do Fabricante: ${fabricanteNome}`;
            console.log(fabricanteId)
            const response = await fetch(`http://localhost:8000/EquipamentoFabricante/?fabricante_id=${fabricanteId}`);
            
            if (!response.ok) {
                throw new Error("Erro ao buscar dados dos equipamentos");
            }

            const equipamentos = await response.json();
            const tableBody = document.getElementById("fabricante-equi-list");

            // Limpa a tabela antes de preencher
            tableBody.innerHTML = '';

            // Preenche a tabela com os dados recebidos
            equipamentos.forEach(equipamento => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${equipamento.nome}</td>
                    <td>${equipamento.status_operacional}</td>
                    <td>${equipamento.total_manutencoes}</td>
                    <td>${equipamento.preventiva_count}</td>
                    <td>${equipamento.preditiva_count}</td>
                    <td>${equipamento.corretiva_count}</td>
                `;

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar os equipamentos.");
        }
    }

    // Obtém o fabricante_id e o fabricante_nome da URL
    const urlParams = new URLSearchParams(window.location.search);
    const fabricanteId = urlParams.get('fabricante_id');
    const fabricanteNome = urlParams.get('fabricante_nome');  // Supondo que você passe o nome do fabricante na URL
    console.log('nome', fabricanteNome)
    // Chama a função passando o ID e o nome do fabricante
    fetchEquipamentos(fabricanteId, fabricanteNome);
});
