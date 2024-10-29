document.getElementById('fabricante-btn').addEventListener('click', function() {
    document.getElementById('fabricante-modal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('fabricante-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('fabricante-modal')) {
        document.getElementById('fabricante-modal').style.display = 'none';
    }
});

document.getElementById('fabricante-cadastrar-btn').addEventListener('click', function() {
    const nome = document.getElementById('nome-fabricante').value;
    
    // Construa o objeto no formato desejado
    const data = {
        nome: nome
    };
    console.log(data)
    fetch('http://localhost:8000/Fabricante/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Converta o objeto para JSON
    })
    .then(response => {
        console.log(response); // Verifica a resposta bruta

        // Verifica se o status da resposta é 200 ou sucesso
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
    })
    .then(data => {
        console.log("cadastrei",data)
        alert('Fabricante cadastrado com sucesso!');
        document.getElementById('fabricante-modal').style.display = 'none';
        document.getElementById('fabricante-form').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
