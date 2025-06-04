/**
 * Calcula a persistência multiplicativa de um número inteiro não-negativo.
 * A persistência multiplicativa é a quantidade de vezes que multiplicamos
 * os dígitos até que o resultado tenha apenas um algarismo.
 *
 * @param {number} n — inteiro não-negativo.
 * @returns {number} — número de iterações necessárias para chegar a um único dígito.
 * @throws {Error} — se n não for inteiro ou for negativo.
 */

function persistenciaMultiplicativa(n) {
  // Valida entrada: deve ser inteiro não-negativo
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("O valor deve ser um inteiro não-negativo.");
  }

  // Se já for um único dígito, a persistência é zero
  if (n >= 0 && n <= 9) {
    return 0;
  }

  let contador = 0;
  let numStr = n.toString();

  // Repete enquanto tiver mais de um algarismo
  while (numStr.length > 1) {
    // Converte cada caractere em dígito e multiplica todos
    const produto = numStr
      .split("")
      .map(d => Number(d))
      .reduce((ac, d) => ac * d, 1);

    contador++;
    numStr = produto.toString();
  }

  return contador;
}

// Função para lidar com o clique do botão
function aoClicar() {
    const input = window.prompt("Informe um número inteiro postivo para calcular a sua persistência multiplicativa: ");

const n = parseInt(input, 10);
    if (isNaN(n) || n <= 0) {
        alert("Por favor, insira um número inteiro positivo.");
    } else {
        console.log(persistenciaMultiplicativa(n));
        alert(persistenciaMultiplicativa(n));
    } // Exibe o resultado no console e em um alerta
}

 document.getElementById("resolver").addEventListener("click", aoClicar);