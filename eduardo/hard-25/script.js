
function distribuicaoValida(s) {
    const pilha = [];
    const pares = { ')': '(', ']': '[', '}': '{' };
    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            pilha.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (pilha.pop() !== pares[char]) {
                return false;
            }
        }
    }
    return pilha.length === 0;
}

// Função para lidar com o clique do botão
function aoClicar() {
    const input = window.prompt("Informe uma string para verificar a distribuição de parênteses, colchetes e chaves:");
    if (input === null) return;
    const resultado = distribuicaoValida(input);
    alert(resultado ? "TRUE" : "FALSE");
}

 document.getElementById("resolver").addEventListener("click", aoClicar);