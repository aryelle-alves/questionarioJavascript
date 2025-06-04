// Gera todas as permutações possíveis dos elementos do array (todas as "senhas")
function gerarSenhas(opcoes) {
    if (opcoes.length === 0) return [[]];
    const resultado = [];
    for (let i = 0; i < opcoes.length; i++) {
        const resto = opcoes.slice(0, i).concat(opcoes.slice(i + 1));
        const permutacoesRestantes = gerarSenhas(resto);
        for (const perm of permutacoesRestantes) {
            resultado.push([opcoes[i], ...perm]);
        }
    }
    return resultado;
}

// Função para lidar com o clique do botão
function aoClicar() {
    const input = window.prompt("Informe as opções separadas por vírgula (ex: a,b,c):");
    if (!input) {
        alert("Por favor, insira pelo menos uma opção.");
        return;
    }
    const opcoes = input.split(',').map(op => op.trim()).filter(op => op.length > 0);
    if (opcoes.length === 0) {
        alert("Nenhuma opção válida informada.");
        return;
    }
    
    const senhas = gerarSenhas(opcoes);
    console.log(senhas);
    alert("Senhas possíveis:\n" + senhas.map(s => s.join('')).join('\n'));
}

document.getElementById("resolver").addEventListener("click", aoClicar);

