function validarCodigo() {
    const input = document.querySelector('.entrada').value.trim();
    const resultadoElement = document.getElementById('resultado');
    
    if (!/^\d{12}$/.test(input)) {
        resultadoElement.textContent = 'false';
        alert('⚠️ Digite exatamente 12 dígitos numéricos ⚠️');
        return;
    }

    const codigo = input.split('').map(Number);
    
    // Passo 1: Soma dos dígitos em posições ímpares (1,3,5,7,9,11) - índices 0,2,4,6,8,10
    const somaImpares = codigo[0] + codigo[2] + codigo[4] + codigo[6] + codigo[8] + codigo[10];
    
    // Passo 2: Multiplica por 3
    const multiplicado = somaImpares * 3;
    
    // Passo 3: Soma dos dígitos em posições pares (2,4,6,8,10) - índices 1,3,5,7,9
    const somaPares = codigo[1] + codigo[3] + codigo[5] + codigo[7] + codigo[9];
    const total = multiplicado + somaPares;
    
    // Passo 4 e 5: Calcula dígito verificador
    const resto = total % 10;
    const digitoEsperado = resto === 0 ? 0 : 10 - resto;
    
    // Compara com o último dígito (índice 11)
    const valido = codigo[11] === digitoEsperado;
    
    resultadoElement.textContent = String(valido);
}