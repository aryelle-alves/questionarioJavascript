class Explorador {
    constructor(nome) {
        this.nome = nome;
        this.nivel = 1;
        this.experienciaTotal = 0;
        this.estaVivo = true;
        this.planetasExploradosComSucesso = [];
        this.acertosCriticosPorTerreno = {};
        this.terrenosEspecialista = new Set();
        this.logEventos = [];
    }

    _adicionarLog(mensagem) {
        this.logEventos.push(mensagem);
    }

    _calcularXpParaPassarNivel(nivel) {
        if (nivel < 1 || nivel >= 99) {
            return Infinity; 
        }
        return 100 + (10 * nivel);
    }

    _calcularTotalXpParaChegarNoNivel(targetLevel) {
        if (targetLevel <= 1) {
            return 0;
        }
        let xpAcumulada = 0;
        for (let i = 1; i < targetLevel; i++) {
            xpAcumulada += this._calcularXpParaPassarNivel(i);
        }
        return xpAcumulada;
    }

    getRanque() {
        if (this.nivel >= 1 && this.nivel <= 9) return "Novato";
        if (this.nivel >= 10 && this.nivel <= 29) return "Explorador";
        if (this.nivel >= 30 && this.nivel <= 49) return "Veterano";
        if (this.nivel >= 50 && this.nivel <= 79) return "Elite";
        if (this.nivel >= 80 && this.nivel <= 98) return "Mestre";
        if (this.nivel >= 99) return "Lenda";
        return "Desconhecido";
    }

    ganharExperiencia(pontos) {
        if (!this.estaVivo) {
            this._adicionarLog(`${this.nome} está morto e não pode ganhar experiência.`);
            return;
        }
        if (pontos <= 0) return;

        this.experienciaTotal += pontos;
        this._adicionarLog(`${this.nome} ganhou ${pontos} XP. XP Total: ${this.experienciaTotal}.`);

        let subiuDeNivel = false;
        while (this.nivel < 99) {
            const xpNecessariaParaProximo = this._calcularTotalXpParaChegarNoNivel(this.nivel + 1);
            if (this.experienciaTotal >= xpNecessariaParaProximo) {
                this.nivel++;
                subiuDeNivel = true;
                this._adicionarLog(`${this.nome} subiu para o Nível ${this.nivel}!`);
            } else {
                break;
            }
        }
        if (subiuDeNivel) {
             this._adicionarLog(`${this.nome} agora é Ranque: ${this.getRanque()}.`);
        }
    }

    rolarDados() {
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;
        return { soma: dado1 + dado2, rolagemIndividual: [dado1, dado2] };
    }

    explorar(planeta) {
        this.logEventos = []; 
        this._adicionarLog(`--- ${this.nome} (Nv. ${this.nivel}) iniciando exploração em ${planeta.name} (${planeta.terrain}/${planeta.hostility}) ---`);

        if (!this.estaVivo) {
            this._adicionarLog(`${this.nome} está morto. Exploração cancelada.`);
            return this.logEventos;
        }

        const { soma: rolagemOriginal, rolagemIndividual } = this.rolarDados();
        let rolagemEfetiva = rolagemOriginal;
        this._adicionarLog(`Rolagem de dados original: ${rolagemIndividual[0]} + ${rolagemIndividual[1]} = ${rolagemOriginal}.`);

        if (this.terrenosEspecialista.has(planeta.terrain)) {
            rolagemEfetiva = Math.min(12, rolagemOriginal + 1);
            if (rolagemOriginal !== rolagemEfetiva) {
                this._adicionarLog(`Bônus de especialista em ${planeta.terrain} aplicado! Rolagem efetiva: ${rolagemEfetiva}.`);
            }
        }

        let sucesso = false;
        if (planeta.hostility === "pacifico") {
            if (rolagemEfetiva >= 5) sucesso = true;
        } else if (planeta.hostility === "neutro") {
            if (rolagemEfetiva >= 7) sucesso = true;
        } else if (planeta.hostility === "hostil") {
            if (rolagemEfetiva >= 9) sucesso = true;
        }

        if (planeta.hostility === "hostil" && rolagemOriginal === 2) {
            if (!this.terrenosEspecialista.has(planeta.terrain)) {
                this.estaVivo = false;
                this._adicionarLog(`FALHA CRÍTICA! ${this.nome} morreu explorando ${planeta.name}!`);
                sucesso = false; 
            } else {
                 this._adicionarLog(`Falha crítica (rolagem 2) evitada em ${planeta.name} devido à especialização em ${planeta.terrain}!`);
            }
        }
        
        if (!this.estaVivo) {
             this.ganharExperiencia(10);
             this._adicionarLog(`--- Fim da Exploração em ${planeta.name} ---`);
             return this.logEventos;
        }


        if (sucesso) {
            this._adicionarLog(`Sucesso na exploração de ${planeta.name}!`);
            if (!this.planetasExploradosComSucesso.includes(planeta.name)) {
                this.planetasExploradosComSucesso.push(planeta.name);
            }

            if (planeta.hostility === "pacifico") this.ganharExperiencia(15);
            else if (planeta.hostility === "neutro") this.ganharExperiencia(25);
            else if (planeta.hostility === "hostil") this.ganharExperiencia(50);

            if (rolagemOriginal === 12) {
                this._adicionarLog(`Acerto crítico (6+6) em ${planeta.name}!`);
                this.acertosCriticosPorTerreno[planeta.terrain] = (this.acertosCriticosPorTerreno[planeta.terrain] || 0) + 1;
                this._adicionarLog(`Acertos críticos em ${planeta.terrain}: ${this.acertosCriticosPorTerreno[planeta.terrain]}.`);
                if (this.acertosCriticosPorTerreno[planeta.terrain] >= 3 && !this.terrenosEspecialista.has(planeta.terrain)) {
                    this.terrenosEspecialista.add(planeta.terrain);
                    this._adicionarLog(`${this.nome} tornou-se especialista em terrenos do tipo '${planeta.terrain}'!`);
                }
            }
        } else {
            this._adicionarLog(`Falha na exploração de ${planeta.name}.`);
            if (planeta.hostility === "hostil") {
                this.ganharExperiencia(10);
            }
        }
        this._adicionarLog(`--- Fim da Exploração em ${planeta.name} ---`);
        return this.logEventos;
    }

    getStatus() {
        let statusString = `Nome: ${this.nome}\n`;
        statusString += `Nível: ${this.nivel}\n`;
        statusString += `XP Total: ${this.experienciaTotal}\n`;
        const xpProximoNivel = this._calcularTotalXpParaChegarNoNivel(this.nivel + 1);
        const xpAtualParaProx = this.experienciaTotal - this._calcularTotalXpParaChegarNoNivel(this.nivel);
        const xpNecessariaParaPassarNivelAtual = this._calcularXpParaPassarNivel(this.nivel);
        
        if (this.nivel < 99) {
            statusString += `XP para Nv. ${this.nivel + 1}: ${xpAtualParaProx} / ${xpNecessariaParaPassarNivelAtual} (Total para Nv. ${this.nivel+1}: ${xpProximoNivel})\n`;
        } else {
            statusString += `XP para Nv. ${this.nivel + 1}: N/A (Nível Máximo)\n`;
        }
        statusString += `Ranque: ${this.getRanque()}\n`;
        statusString += `Status: ${this.estaVivo ? "Vivo" : "Morto"}\n`;
        statusString += `Planetas Conhecidos: ${this.planetasExploradosComSucesso.join(', ') || "Nenhum"}\n`;
        statusString += `Especializações: ${[...this.terrenosEspecialista].join(', ') || "Nenhuma"}\n`;
        statusString += `Log de Eventos Recentes:\n${this.logEventos.join('\n')}`;
        return statusString;
    }
}

function exibirResultado(mensagens) {
    const areaResultado = document.getElementById("areaResultado");
    if (Array.isArray(mensagens)) {
        areaResultado.textContent = mensagens.join('\n');
    } else {
        areaResultado.textContent = mensagens;
    }
}

function rodarCenario1() {
    const explorador = new Explorador("Teste Explorador 1");
    explorador.nivel = 9;
    explorador.experienciaTotal = 1340; 
    
    explorador.acertosCriticosPorTerreno['forest'] = 2;
    
    let log = [`Cenário 1 Iniciado - Configuração Manual:`];
    log.push(`Nome: ${explorador.nome}, Nível: ${explorador.nivel}, XP Total: ${explorador.experienciaTotal}`);
    log.push(`Acertos críticos em 'forest' pré-configurados: ${explorador.acertosCriticosPorTerreno['forest']}`);
    log.push(`Ranque Inicial: ${explorador.getRanque()}`);

    const planeta1 = { id: 1, name: 'Planeta 1', hostility: 'neutro', terrain: 'forest' };
    log.push(`\nExplorando ${planeta1.name}...`);
    
    const logExploracao = explorador.explorar(planeta1);
    log = log.concat(logExploracao);
    
    log.push(`\nStatus Final do Explorador:`);
    log.push(`Nível: ${explorador.nivel}`);
    log.push(`XP Total: ${explorador.experienciaTotal}`);
    log.push(`Ranque: ${explorador.getRanque()}`);
    log.push(`Especialista em 'forest': ${explorador.terrenosEspecialista.has('forest')}`);
    log.push(`Planetas Conhecidos: ${explorador.planetasExploradosComSucesso.join(', ')}`);
    log.push(`Está vivo: ${explorador.estaVivo}`);

    exibirResultado(log);
}

function rodarCenario2() {
    const explorador = new Explorador("Teste Explorador 2");
    explorador.nivel = 10; 
    explorador.experienciaTotal = 1365; 
    explorador.terrenosEspecialista.add('forest');
    explorador.planetasExploradosComSucesso.push('Planeta 1');
    
    let log = [`Cenário 2 Iniciado - Configuração Manual (pós-Cenário 1):`];
    log.push(`Nome: ${explorador.nome}, Nível: ${explorador.nivel}, XP Total: ${explorador.experienciaTotal}`);
    log.push(`Especialista em 'forest': ${explorador.terrenosEspecialista.has('forest')}`);
    log.push(`Ranque Inicial: ${explorador.getRanque()}`);


    const planeta2 = { id: 2, name: 'Planeta 2', hostility: 'hostile', terrain: 'desert' };
    log.push(`\nExplorando ${planeta2.name}... (Simulando rolagem 2)`);

    explorador.rolarDados = () => ({ soma: 2, rolagemIndividual: [1, 1] }); 
    
    const logExploracao = explorador.explorar(planeta2);
    log = log.concat(logExploracao);

    log.push(`\nStatus Final do Explorador:`);
    log.push(`Nível: ${explorador.nivel}`);
    log.push(`XP Total: ${explorador.experienciaTotal}`);
    log.push(`Ranque: ${explorador.getRanque()}`);
    log.push(`Está vivo: ${explorador.estaVivo}`);
    
    exibirResultado(log);
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCenario1 = document.getElementById("rodarCenario1");
    const btnCenario2 = document.getElementById("rodarCenario2");

    if (btnCenario1) {
        btnCenario1.addEventListener("click", rodarCenario1);
    }
    if (btnCenario2) {
        btnCenario2.addEventListener("click", rodarCenario2);
    }
});