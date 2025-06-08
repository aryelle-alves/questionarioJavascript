class Equation {
    constructor(a = 0, b = 0, c = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    solve() {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '';

        if (this.a === 0 && this.b === 0 && this.c === 0) {
            resultadoDiv.innerHTML = '<span class="calculo-aviso">Erro! Equação inválida (todos os coeficientes são zero).</span>';
            return [];
        }

        if (this.a === 0) {
            if (this.b === 0) {
                resultadoDiv.innerHTML = `
                    <ul class="steps-list">
                        <li class="calculo-aviso">Parâmetros insuficientes.</li>
                        <li class="calculo-aviso">Nenhuma raiz real.</li>
                        <li class="calculo">[]</li>
                    </ul>
                `;
                return [];
            }

            const root = -this.c / this.b;
            resultadoDiv.innerHTML = `
                <ul class="steps-list">
                    <li class="calculo">${this.b}x + ${this.c} = 0</li>
                    <li class="calculo">${this.b}x = ${-this.c}</li>
                    <li class="calculo">x = ${-this.c} / ${this.b}</li>
                    <li class="calculo">x = ${root.toFixed(2)}</li>
                    <li class="calculo">[${root.toFixed(2)}]</li>
                </ul>
            `;
            return [root];
        }

        const delta = this.b * this.b - 4 * this.a * this.c;
        
        if (delta < 0) {
            resultadoDiv.innerHTML = `
                <ul class="steps-list">
                    <li class="calculo">Δ = ${this.b}² - 4 * ${this.a} * ${this.c}</li>
                    <li class="calculo">Δ = ${delta}</li>
                    <li class="calculo-aviso">Δ < 0: Nenhuma raiz real.</li>
                    <li class="calculo">[]</li>
                </ul>
            `;
            return [];
        }

        const sqrtDelta = Math.sqrt(delta);
        const x1 = (-this.b + sqrtDelta) / (2 * this.a);
        const x2 = (-this.b - sqrtDelta) / (2 * this.a);

        resultadoDiv.innerHTML = `
            <ul class="steps-list">
                <li class="calculo">Δ = ${this.b}² - 4 * ${this.a} * ${this.c}</li>
                <li class="calculo">Δ = ${delta}</li>
                <li class="calculo">x' = (-(${this.b}) + √${delta}) / 2 * ${this.a}</li>
                <li class="calculo">x" = (-(${this.b}) - √${delta}) / 2 * ${this.a}</li>
                <li class="calculo">x' = ${-this.b} + ${sqrtDelta.toFixed(2)} / ${2 * this.a}</li>
                <li class="calculo">x" = ${-this.b} - ${sqrtDelta.toFixed(2)} / ${2 * this.a}</li>
                <li class="calculo">x' = ${x1.toFixed(2)}</li>
                <li class="calculo">x" = ${x2.toFixed(2)}</li>
                <li class="calculo">[${x1.toFixed(2)}, ${x2.toFixed(2)}]</li>
            </ul>
        `;

        return delta === 0 ? [x1] : [x1, x2];
    }
}

function processarEquacao() {
    const input = document.querySelector('.entrada').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    
    if (!input) {
        resultadoDiv.innerHTML = '<span class="calculo-aviso">Erro! Nenhum parâmetro informado.</span>';
        return;
    }

    const cleanedInput = input.replace(/[()]/g, '');
    const valores = cleanedInput.split(',').map(val => val.trim()).filter(val => val !== '');
    
    if (valores.length !== 3) {
        resultadoDiv.innerHTML = '<span class="calculo-aviso">Formato inválido. Use: a,b,c (separados por vírgulas)</span>';
        return;
    }

    const a = parseFloat(valores[0]);
    const b = parseFloat(valores[1]);
    const c = parseFloat(valores[2]);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultadoDiv.innerHTML = '<span class="calculo-aviso">Valores inválidos. Insira apenas números.</span>';
        return;
    }

    const equation = new Equation(a, b, c);
    equation.solve();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.resolucao-btn').addEventListener('click', processarEquacao);
    
    document.querySelector('.entrada').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processarEquacao();
        }
    });
});