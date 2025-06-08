function validarCodigo() {
    const input = document.querySelector('.entrada').value.trim();
    const resultadoElement = document.getElementById('resultado');
    
    if (!/^\d{12}$/.test(input)) {
        resultadoElement.textContent = 'false';
        alert('⚠️ Digite exatamente 12 dígitos numéricos ⚠️');
        return;
    }

    const codigo = input.split('').map(Number);
    
    const somaImpares = codigo[0] + codigo[2] + codigo[4] + codigo[6] + codigo[8] + codigo[10];
    
    const multiplicado = somaImpares * 3;
    
    const somaPares = codigo[1] + codigo[3] + codigo[5] + codigo[7] + codigo[9];
    const total = multiplicado + somaPares;
    
    const resto = total % 10;
    const digitoEsperado = resto === 0 ? 0 : 10 - resto;
    
    const valido = codigo[11] === digitoEsperado;
    
    resultadoElement.textContent = String(valido);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.resolucao-btn').addEventListener('click', validarCodigo);

    document.querySelector('.entrada').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validarCodigo();
        }
    });
});