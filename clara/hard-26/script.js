function fibonacci(n) {
  if (n === 0n) return 0n;
  if (n === 1n) return 1n;

  let a = 0n, b = 1n;
  for (let i = 2n; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function aoClicar() {
  const entrada = prompt("Digite a posição na sequência Fibonacci: (formato: (n))");

  if (!entrada) {
    alert("Entrada é obrigatória.");
    return;
  }

  const entradaTrim = entrada.trim().toLowerCase();

  const regex = /^\(\s*(\d+n?)\s*\)$/;

  const match = entradaTrim.match(regex);

  if (!match) {
    alert("Entrada inválida! Use formato conforme solicitado.");
    return;
  }

  let numStr = match[1];
  
  if (numStr.endsWith('n')) {
    numStr = numStr.slice(0, -1);
  }

  let pos;
  try {
    pos = BigInt(numStr);
  } catch {
    alert("Número inválido.");
    return;
  }

  if (pos < 0n) {
    alert("Número deve ser maior ou igual a zero.");
    return;
  }

  const resultado = fibonacci(pos);

  alert("Saída: " + resultado.toString() + "n");
}

document.getElementById("resolver").addEventListener("click", aoClicar);





