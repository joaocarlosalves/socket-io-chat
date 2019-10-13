// CHAT -> Socket IO | João Carlos Alves | 2019
// Dependências
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Adiciona o diretório public no path do express para essa instância
app.set('views', path.join(__dirname, 'public')); // Adiciona um path para renderização das views
app.engine('html', require('ejs').renderFile); // Abre e renderiza arquivos HTML
app.set('view engine', 'html'); // Define a view engine para HTML

// Rota raiz
app.use('/', (req, res) => {
    res.render('index.html'); // Usa o EJS para renderizar o HTML
});

let messages = []; // Objeto vazio que armazenará as mensagens do chat

// Socket io init
io.on('connection', socket => {
    socket.emit('previousMessages', messages); // Adiciona mensagens anteriores numa nova conversa

    // Envia nova mensagem
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

server.listen(3000); // Executa o servidor