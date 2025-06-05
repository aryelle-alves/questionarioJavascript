function inverterPalavra(palavra) {
    const palavraMinuscula = palavra.toLowerCase();
    let palavraInvertida = "";
    for (let i = palavraMinuscula.length - 1; i >= 0; i--) {
        palavraInvertida += palavraMinuscula[i];
    }
    return palavraInvertida;
}

function processarStringHistoria(textoOriginal) {
    if (textoOriginal === null || textoOriginal.trim() === "") {
        return "";
    }

    const palavras = textoOriginal.split(' ');
    const palavrasProcessadas = [];

    for (let i = 0; i < palavras.length; i++) {
        palavrasProcessadas.push(inverterPalavra(palavras[i]));
    }

    return palavrasProcessadas.join(' ');
}

function aoClicarQuestao06() {
    const areaResultado = document.getElementById("areaResultado");
    areaResultado.innerHTML = "";

    const inputString = window.prompt("Digite a frase (apenas letras e espaços):");

    if (inputString === null) {
        areaResultado.innerHTML = "<p>Operação cancelada pelo usuário.</p>";
        return;
    }
    
    if (inputString.trim() === "") {
        areaResultado.innerHTML = "<p><strong>Original:</strong> ''</p><p><strong>Processado:</strong> ''</p>";
        return;
    }

    const stringProcessada = processarStringHistoria(inputString);

    areaResultado.innerHTML = `
        <p><strong>Frase Original:</strong> <code>${inputString}</code></p>
        <p><strong>Frase Processada:</strong> <code>${stringProcessada}</code></p>
    `;
}

document.getElementById("resolverQuestao06").addEventListener("click", aoClicarQuestao06);