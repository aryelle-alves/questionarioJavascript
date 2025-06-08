function descriptografarCesar() {
    const textoInput = document.getElementById('textoInput').value;
    const chaveInput = document.getElementById('chaveInput').value;
    const resultadoElement = document.getElementById('resultado');
    
    // Validação
    if (!textoInput || isNaN(chaveInput)) {
        resultadoElement.textContent = '⚠️ Digite um texto e uma chave válidos ⚠️';
        return;
    }

    const chave = parseInt(chaveInput);
    const textoDescriptografado = aplicarCifraCesar(textoInput, chave);
    
    resultadoElement.textContent = textoDescriptografado;
}

function aplicarCifraCesar(texto, chave) {
    // Ajusta a chave para valores maiores que 26
    chave = chave % 26;
    
    return texto.split('').map(caractere => {
        // Verifica se é uma letra
        if (/[A-Za-z]/.test(caractere)) {
            const codigo = caractere.charCodeAt(0);
            const base = codigo <= 90 ? 65 : 97; // 65 para A-Z, 97 para a-z
            // Aplica o deslocamento para trás (descriptografia)
            let novoCodigo = codigo - chave;
            // Ajusta para permanecer no alfabeto
            if (novoCodigo < base) novoCodigo += 26;
            return String.fromCharCode(novoCodigo);
        }
        return caractere; // Mantém caracteres não-alfabéticos
    }).join('');
}

// Configura o event listener
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.descriptografar-btn').addEventListener('click', descriptografarCesar);

    document.querySelector('.entrada').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            descriptografarCesar();
        }
    });
});