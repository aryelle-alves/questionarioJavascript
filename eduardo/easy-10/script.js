/**
 * Calcula o fatorial de um número n (n!) retornando um BigInt,
 * sem usar loops explícitos. Para valores altos, BigInt garante
 * precisão para resultados maiores que 2^53 - 1.
 *
 * @param {number} n — inteiro não-negativo cujo fatorial será calculado.
 * @returns {BigInt} — valor de n! como BigInt.
 * @throws {Error} — se n for negativo ou não-inteiro.
 */
function fatorial(n) {
  // Verifica se n é inteiro e não-negativo
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('O valor de n deve ser um inteiro não-negativo.');
  }

  // Caso base: 0! e 1! são iguais a 1
  if (n === 0 || n === 1) {
    return 1n;
  }

  // Cria um array [1, 2, 3, ..., n] e multiplica todos os elementos
  // usando reduce(). Cada elemento é convertido para BigInt antes da multiplicação.
  const seq = Array.from({ length: n }, (_, i) => BigInt(i + 1));
  return seq.reduce((acumulador, valor) => acumulador * valor, 1n);
}


// Função para lidar com o clique do botão
function aoClicar() {
    const input = window.prompt("Informe um número inteiro positivo para que seja retornado o seu fatorial: ");
    const n = parseInt(input, 10);
    if (isNaN(n) || n < 0) {
        alert("Por favor, insira um número inteiro positivo.");
    } else {
        const resultado = fatorial(n);
        console.log(resultado);
        alert(`O fatorial de ${n} é ${resultado}n`);
    } // Exibe o resultado no console e em um alerta
}

 document.getElementById("resolver").addEventListener("click", aoClicar);