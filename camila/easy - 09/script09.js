function verificarMesmaQuantidade(texto) {
    if (texto === null) {
        return false; 
    }
    if (texto === "") {
        return true; 
    }

    const textoMinusculo = texto.toLowerCase();
    const frequencias = {}; 

    for (let i = 0; i < textoMinusculo.length; i++) {
        const char = textoMinusculo[i];
        frequencias[char] = (frequencias[char] || 0) + 1;
    }

    let frequenciaReferencia = -1;
    let primeiraChave = true;

    for (const char in frequencias) {
        if (primeiraChave) {
            frequenciaReferencia = frequencias[char];
            primeiraChave = false;
        } else {
            if (frequencias[char] !== frequenciaReferencia) {
                return false; 
            }
        }
    }

    return true; 
}

function aoClicarQuestao09() {
    const areaResultado = document.getElementById("areaResultado");
    areaResultado.innerHTML = ""; 

    const inputString = window.prompt("Digite a string para verificar:");

    if (inputString === null) {
        areaResultado.innerHTML = "<p>Operação cancelada pelo usuário.</p>";
        return;
    }
    
    const resultado = verificarMesmaQuantidade(inputString);

    areaResultado.innerHTML = `
        <p><strong>String Original:</strong> <code>${inputString}</code></p>
        <p><strong>Possui mesma quantidade de cada caractere?</strong> <code>${resultado}</code></p>
    `;
}

document.getElementById("resolverQuestao09").addEventListener("click", aoClicarQuestao09);