function elevacaoQuadraticaIndividual(numero) {
  const numeroStr = numero.toString();
  let resultado = '';

  for (let i = 0; i < numeroStr.length; i++) {
    const digito = parseInt(numeroStr[i]);
    const quadrado = digito * digito;
    resultado += quadrado.toString();
  }

  return parseInt(resultado);
}

function aoClicar() {
  const input = window.prompt("Informe um número inteiro positivo:");
  const n = parseInt(input, 10);

  if (isNaN(n) || n <= 0) {
    alert("Valor inválido, insira um número inteiro positivo.");
  } else {
    const resultado = elevacaoQuadraticaIndividual(n);
    console.log(resultado);
    alert(resultado);
  }
}

document.getElementById("resolver").addEventListener("click", aoClicar);
