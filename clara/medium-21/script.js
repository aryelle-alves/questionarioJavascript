class Coordenada {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  obterSetor() {
    const positivoOuZero = n => n >= 0;

    if (positivoOuZero(this.x) && positivoOuZero(this.y) && positivoOuZero(this.z)) return 'Alfa';
    if (positivoOuZero(this.x) && positivoOuZero(this.y) && this.z < 0) return 'Beta';
    if (positivoOuZero(this.x) && this.y < 0 && positivoOuZero(this.z)) return 'Gama';
    if (positivoOuZero(this.x) && this.y < 0 && this.z < 0) return 'Delta';
    if (this.x < 0 && positivoOuZero(this.y) && positivoOuZero(this.z)) return 'Épsilon';
    if (this.x < 0 && positivoOuZero(this.y) && this.z < 0) return 'Zeta';
    if (this.x < 0 && this.y < 0 && positivoOuZero(this.z)) return 'Sigma';
    if (this.x < 0 && this.y < 0 && this.z < 0) return 'Ômega';
  }

  calcularDistancia() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
}

function aoClicar() {
  const entrada = prompt("Digite a entrada no formato: [x, y, z]");

  if (!entrada) {
    alert("Entrada obrigatória.");
    return;
  }

  const regex = /^\[\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\]$/;
  const match = entrada.match(regex);

  if (!match) {
    alert("Entrada inválida! Use o formato: [x, y, z]");
    return;
  }

  const x = Number(match[1]);
  const y = Number(match[2]);
  const z = Number(match[3]);

  const ponto = new Coordenada(x, y, z);
  const setor = ponto.obterSetor();
  const distancia = ponto.calcularDistancia();

  alert(`Saída:\nSetor: ${setor}\nDistância: ${distancia}`);
}

document.getElementById("resolver").addEventListener("click", aoClicar);
