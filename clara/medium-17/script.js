function inserirPalavra(frase, palavra, indices) {
  if (indices.length === 0) return frase;

  let chars = frase.split('');
  let indicesValidos = indices.filter(i => i >= 0 && i <= frase.length).sort((a, b) => a - b);

  let offset = 0;
  for (let idx of indicesValidos) {
    let pos = idx + offset;
    const palavraChars = [...palavra, ' '];
    chars.splice(pos, 0, ...palavraChars);
    offset += palavraChars.length;
  }

  return chars.join('');
}

function aoClicar() {
  const entrada = prompt("Digite a entrada no formato: ('frase', 'palavra', [índices])");

  if (!entrada) {
    alert("Entrada é obrigatória.");
    return;
  }

  const regex = /^\(\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*\[([0-9,\s]*)\]\s*\)$/;

  const match = entrada.match(regex);

  if (!match) {
    alert("Entrada inválida! Use o formato: ('frase', 'palavra', [índices])");
    return;
  }

  const frase = match[1];
  const palavra = match[2];
  const indicesStr = match[3];

  let indices = [];
  if (indicesStr.trim().length > 0) {
    indices = indicesStr.split(',').map(i => parseInt(i.trim())).filter(i => !isNaN(i));
  }

  const resultado = inserirPalavra(frase, palavra, indices);

  alert("Saída:\n" + resultado);
}

document.getElementById("resolver").addEventListener("click", aoClicar);
