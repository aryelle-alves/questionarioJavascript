// Função para extrair IDs e Labels de um objeto
function extrairIdsELabels(obj) {
    const resultado = [];

    function buscar(objeto) {
        if (objeto && typeof objeto === 'object') {
            // Se for uma propriedade "connection"
            if (objeto.connection && typeof objeto.connection === 'object') {
                if ('_id' in objeto.connection) resultado.push(objeto.connection._id);
                if ('label' in objeto.connection) resultado.push(objeto.connection.label);
            }
            // Se for uma propriedade "connections"
            if (Array.isArray(objeto.connections)) {
                for (const conn of objeto.connections) {
                    if ('_id' in conn) resultado.push(conn._id);
                    if ('label' in conn) resultado.push(conn.label);
                }
            }
            // Busca recursiva em todas as propriedades do objeto
            for (const key in objeto) {
                if (objeto.hasOwnProperty(key)) {
                    buscar(objeto[key]);
                }
            }
        }
    }

    buscar(obj);
    return resultado;
}

// Função para lidar com o clique do botão
function aoClicar() {
    const inputArquivo = document.getElementById("arquivoJson");
    if (!inputArquivo.files || inputArquivo.files.length === 0) {
        alert("Selecione um arquivo .json primeiro.");
        return;
    }
    const arquivo = inputArquivo.files[0];
    const leitor = new FileReader();
    leitor.onload = function(e) {
        try {
            const obj = JSON.parse(e.target.result);
            const resultado = extrairIdsELabels(obj);
            alert("Valores encontrados: " + JSON.stringify(resultado));
            console.log(resultado);
        } catch (err) {
            alert("Arquivo JSON inválido!");
        }
    };
    leitor.readAsText(arquivo);
}

document.getElementById("resolver").addEventListener("click", aoClicar);