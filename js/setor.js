document.getElementById('setor-btn').addEventListener('click', function() {
    const modal = document.getElementById('setor-modal');
    modal.style.display = 'block';    
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('setor-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('setor-modal')) {
        document.getElementById('setor-modal').style.display = 'none';
    }
});

// SETOR - CADASTRA

document.getElementById('setor-cadastrar-btn').addEventListener('click', function() {
    const nome = document.getElementById('setor-nome').value;
    const responsavel = document.getElementById('setor-responsavel').value;
    console.log(responsavel)
   
    const data = {
        nome: nome,
        responsavel: responsavel
    };
    console.log(data)
    fetch('http://localhost:8000/Setor/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Setor cadastrado com sucesso!');
        document.getElementById('setor-modal').style.display = 'none';
        document.getElementById('setor-form').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});