function gerarIntervaloCoordenadas(xInput, yInput) {
    const coordenadas = [];

    if (xInput < 0 || yInput < 0) {
        return [];
    }

    for (let currentX = 0; currentX <= xInput; currentX++) {
        for (let currentY = 0; currentY <= yInput; currentY++) {
            coordenadas.push([currentX, currentY]);
        }
    }
    return coordenadas;
}

function aoClicarQuestao11() {
    const areaResultado = document.getElementById("areaResultado");
    areaResultado.innerHTML = "";

    const inputString = window.prompt("Digite o par ordenado (x, y) separado por vírgula (ex: 2,2):");

    if (inputString === null) {
        areaResultado.innerHTML = "<p>Operação cancelada pelo usuário.</p>";
        return;
    }

    const partes = inputString.split(',');
    if (partes.length !== 2) {
        areaResultado.innerHTML = "<p>Formato de entrada inválido. Use x,y (ex: 2,2).</p>";
        return;
    }

    const xInput = parseInt(partes[0].trim(), 10);
    const yInput = parseInt(partes[1].trim(), 10);

    if (isNaN(xInput) || isNaN(yInput)) {
        areaResultado.innerHTML = "<p>Valores de x ou y inválidos. Devem ser números.</p>";
        return;
    }
    
    const resultado = gerarIntervaloCoordenadas(xInput, yInput);

    let resultadoFormatado = "[";
    for (let i = 0; i < resultado.length; i++) {
        resultadoFormatado += `[${resultado[i][0]},${resultado[i][1]}]`;
        if (i < resultado.length - 1) {
            resultadoFormatado += ",";
        }
    }
    resultadoFormatado += "]";
    if (resultado.length === 0) {
        resultadoFormatado = "[]";
    }

    areaResultado.innerHTML = `
        <p><strong>Par de Entrada:</strong> <code>(${xInput}, ${yInput})</code></p>
        <p><strong>Intervalo de Coordenadas Gerado:</strong> <code style="word-break: break-all;">${resultadoFormatado}</code></p>
    `;
}

document.getElementById("resolverQuestao11").addEventListener("click", aoClicarQuestao11);