function formatarNome() {
    console.log("Script carregado");

    const nomeCompleto = document.getElementById('nomeInput').value.trim();

    // Validação
    if (nomeCompleto === '') {
        alert('⚠️ Digite um nome válido ⚠️');
        return;
    }

    // Processamento
    const nomeFormatado = processarNome(nomeCompleto);

    // Mostrar resultados
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