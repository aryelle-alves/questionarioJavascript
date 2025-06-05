function inverterArray(arrayOriginal) {
    const arrayInvertido = [];
    for (let i = arrayOriginal.length - 1; i >= 0; i--) {
        arrayInvertido.push(arrayOriginal[i]);
    }
    return arrayInvertido;
}

function aoClicarQuestao03() {
    const areaResultado = document.getElementById("areaResultado");
    areaResultado.innerHTML = "";

    const inputString = window.prompt("Digite os elementos do array separados por vírgula (ex: 1,2,3 ou a,b,c ou deixe em branco para um array vazio):");

    let arrayParaProcessar = [];

    if (inputString !== null) {
        const elementos = inputString.split(',');

        if (inputString.trim() === "") {
            arrayParaProcessar = [];
        } else {
            arrayParaProcessar = elementos.map(elemento => {
                return elemento.trim();
            }).filter(el => el !== "" || inputString.split(',').length === 1);
        }
    } else {
        areaResultado.innerHTML = "<p>Operação cancelada pelo usuário.</p>";
        return;
    }
    
    const arrayInvertido = inverterArray(arrayParaProcessar);

    areaResultado.innerHTML = `
        <p><strong>Array Original:</strong> <code>[${arrayParaProcessar.join(', ')}]</code></p>
        <p><strong>Array Invertido:</strong> <code>[${arrayInvertido.join(', ')}]</code></p>
    `;
}

document.getElementById("resolverQuestao03").addEventListener("click", aoClicarQuestao03);