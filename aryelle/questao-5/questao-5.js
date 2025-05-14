function resolucaoCharada() {
    const frase = document.getElementById('fraseInput').value.trim();

    // Validação
    if (frase === '') {
        alert('⚠️ Digite um texto válido ⚠️');
        return;
    }

    // Processamento
    const maiorLetra = processarFrase(frase);

    // Mostrar resultados
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    const p = document.createElement('p');
    p.textContent = maiorLetra;
    resultado.appendChild(p);    
}

function processarFrase(texto) {
    const textoLimpo = texto.replace(/\s/g, '').toLowerCase();
    let maiorLetra = 'a';

    for (let letra of textoLimpo) {
        if (letra > maiorLetra) {
            maiorLetra = letra;
        }
    }

    return "'" + maiorLetra + "'";
}