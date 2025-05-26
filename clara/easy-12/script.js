function calcularMoedas(valor) {
  const moedas = [500, 100, 25, 10, 5, 1];
  const resultado = {
    '1': 0,
    '5': 0,
    '10': 0,
    '25': 0,
    '100': 0,
    '500': 0
  };

  for (let i = 0; i < moedas.length; i++) {
    const moeda = moedas[i];
    const quantidade = Math.floor(valor / moeda);
    resultado[moeda.toString()] = quantidade;
    valor -= quantidade * moeda;
  }

  return resultado;
}

function aoClicar() {
  const input = window.prompt("Informe um valor inteiro positivo:");
  const n = parseInt(input, 10);

  if (isNaN(n) || n <= 0) {
    alert("Tente novamente, insira um número inteiro positivo.");
  } else {
    const resultado = calcularMoedas(n);
    console.log(resultado);
    alert(JSON.stringify(resultado));
  }
}

document.getElementById("resolver").addEventListener("click", aoClicar);