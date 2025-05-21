function retornaChunk(n) {
 if (n <= 1) {
    return "chunk"; 
}
    return "chunk-" + retornaChunk(n - 1);

    
}
// Função para lidar com o clique do botão
function aoClicar() {
    const input = window.prompt("Informe um número inteiro postivo: ");
const n = parseInt(input, 10);
    if (isNaN(n) || n <= 0) {
        alert("Por favor, insira um número inteiro positivo.");
    } else {
        console.log(retornaChunk(n));
        alert(retornaChunk(n));
    } // Exibe o resultado no console e em um alerta
}

 document.getElementById("resolver").addEventListener("click", aoClicar);