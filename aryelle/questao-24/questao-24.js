document.addEventListener('DOMContentLoaded', function() {
    // Banco de dados de usuários já cadastrados
    const usuariosRegistrados = ['erick_14', 'pam_ls2', 'VICTOR_99A'];
    
    // Função principal de validação
    function validarUsuario(username) {
        // 1. Verifica comprimento (4-32 caracteres)
        if (username.length < 4 || username.length > 32) {
            return "'" + false + "'";
        }
        
        // 2. Verifica caracteres permitidos (apenas letras, números e _)
        const regexCaracteres = /^[A-Za-z0-9_]+$/;
        if (!regexCaracteres.test(username)) {
            return "'" + false + "'";
        }
        
        // 3. Verifica se começa com letra
        const regexPrimeiroChar = /^[A-Za-z]/;
        if (!regexPrimeiroChar.test(username)) {
            return "'" + false + "'";
        }
        
        // 4. Verifica se termina com _
        if (username.endsWith('_')) {
            return "'" + false + "'";
        }
        
        // 5. Verifica presença de pelo menos uma letra, um número e um _
        const temLetra = /[A-Za-z]/.test(username);
        const temNumero = /[0-9]/.test(username);
        const temUnderscore = /_/.test(username);
        
        if (!temLetra || !temNumero || !temUnderscore) {
            return "'" + false + "'";
        }
        
        /*
        if (usuariosRegistrados.includes(username)) {
            return "'" + false + "'";
        }
        */

        // Se passou por todas as validações
        return "'" + true + "'";
    }
    
    // Função para processar a verificação e exibir o resultado
    function verificarUsuario() {
        const input = document.querySelector('.entrada');
        const username = input.value.trim();
        const resultadoDiv = document.getElementById('resultado');
        
        if (!username) {
            resultadoDiv.innerHTML = '<span> " + false + " </span>';
            return;
        }
        
        const valido = validarUsuario(username);
        resultadoDiv.innerHTML = `<span>${valido}</span>`;
    }
    
    // Configurar eventos
    document.querySelector('.resolucao-btn').addEventListener('click', verificarUsuario);
    
    document.querySelector('.entrada').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarUsuario();
        }
    });
});