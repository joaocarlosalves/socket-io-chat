// CHAT -> Socket IO | João Carlos Alves | 2019

let socket = io('http://localhost:3000');
let chatForm = document.querySelector('#chat');

// Renderiza a mensagem no HTML
function renderMessage(message) {
    document.querySelector('#messages').innerHTML += `
        <div class="message">
            <strong>• ${message.username}</strong>: ${message.message}
        </div>
    `;
};

// Recupera as mensagens existentes para adicionar ao novo usuário
socket.on('previousMessages', (messages) => {
    for(message of messages) {
        renderMessage(message);
    }
});

// Nova mensagem recebida e dispara a renderização
socket.on('receivedMessage', (message) => {
    renderMessage(message);
});

// Função para o submit do conteúdo dos campos.
chatForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o envio padrão

    let username = document.querySelector('#username');
    let message = document.querySelector('#message');

    // Valida os campos antes de enviar
    // Se vazio = fundo vermelho claro
    if(username.value === '') {
        username.style = 'background: rgba(255, 0, 0, .1)';
    } else if(message.value === '') {        
        message.style = 'background: rgba(255, 0, 0, .1)';
    } else {
        username.style = 'background: white';
        message.style = 'background: white';

        // Monta o objeto que será a mensagem enviada
        let messageObject = {
            username: username.value,
            message: message.value
        }

        renderMessage(messageObject); // Chama a função que renderiza a mensagem no HTML

        socket.emit('sendMessage', messageObject); // Dispara o evento do socket io para envio da mensagem em tempo real
    }
});