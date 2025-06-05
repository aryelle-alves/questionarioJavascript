function encontrarPrisioneirosFaltando(listaPrisioneiros) {
    if (!listaPrisioneiros || listaPrisioneiros.length === 0) {
        return [];
    }

    const paddingLength = listaPrisioneiros[0].length;
    let n = 0;
    const prisioneirosPresentes = new Set();

    for (const idStr of listaPrisioneiros) {
        const idNum = parseInt(idStr, 10);
        if (idNum > n) {
            n = idNum;
        }
        prisioneirosPresentes.add(idNum);
    }

    if (n === 0) {
        return [];
    }

    const faltantes = [];
    for (let i = 1; i <= n; i++) {
        if (!prisioneirosPresentes.has(i)) {
            faltantes.push(i.toString().padStart(paddingLength, '0'));
        }
    }

    return faltantes;
}

function aoClicarQuestao22() {
    const areaResultado = document.getElementById("areaResultado");
    areaResultado.innerHTML = "";

    const inputString = window.prompt("Digite a lista de IDs de prisioneiros, separados por vírgula (ex: 0004,0002,0005,0003):");

    if (inputString === null) {
        areaResultado.innerHTML = "<p>Operação cancelada pelo usuário.</p>";
        return;
    }

    let listaPrisioneirosInput = [];
    if (inputString.trim() !== "") {
        listaPrisioneirosInput = inputString.split(',').map(id => id.trim()).filter(id => id !== "");
    }
    
    const resultado = encontrarPrisioneirosFaltando(listaPrisioneirosInput);

    areaResultado.innerHTML = `
        <p><strong>Lista de Entrada:</strong> <code>[${listaPrisioneirosInput.map(id => `'${id}'`).join(', ')}]</code></p>
        <p><strong>Prisioneiros Faltando:</strong> <code>[${resultado.map(id => `'${id}'`).join(', ')}]</code></p>
    `;
}

document.getElementById("resolverQuestao22").addEventListener("click", aoClicarQuestao22);