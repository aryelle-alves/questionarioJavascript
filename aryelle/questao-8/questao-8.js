function formatarNome() {
    console.log("Script carregado");

    const nomeCompleto = document.getElementById('nomeInput').value.trim();

    if (nomeCompleto === '') {
        alert('⚠️ Digite um nome válido ⚠️');
        return;
    }

    const nomeFormatado = processarNome(nomeCompleto);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    const p = document.createElement('p');
    p.textContent = nomeFormatado;
    resultado.appendChild(p);
}

function processarNome(nomeCompleto) {
    const partesNome = nomeCompleto.split(' ');

    if (partesNome.length === 1) {
        return partesNome[0].toUpperCase();
    }

    const ultimoNome = partesNome.pop().toUpperCase();
    const iniciais = partesNome.map(nome => nome[0].toUpperCase() + '.').join(' ');

    return "' "  + ultimoNome + ', ' + iniciais + " '";
}

document.addEventListener('DOMContentLoaded', function() {
    // Configura o listener para o botão existente
    document.querySelector('.resolucao-btn').addEventListener('click', formatarNome);
    
    // Adiciona o listener para o Enter no campo de entrada
    document.getElementById('nomeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            formatarNome(); // Chama a mesma função do botão
        }
    });
});