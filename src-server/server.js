import { dealCards, initializeGame, addPlayer, removePlayer, playCard } from '../src-server/game.js';

const PORT = process.env.PORT || 3000;

var express = require('express');

var app = express();
var server = app.listen(PORT);

app.use(express.static('dist'));

console.log("Server running");

var socket = require('socket.io');

var io = socket(server);

let game = initializeGame();

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    // Log new connection in console
    console.log("New user: " + socket.id);

    // Add new player to game
    game = addPlayer(game, socket.id, "Sebastian");
    
    // Emit data to all
    io.sockets.emit('drawGame', game);

    // Receive data TODO: Remove if not used
    socket.on('clickCard', (card) => {
        playCard(game, socket.id, card);
        io.sockets.emit('drawGame', game);
    });


    // Handle disconnect
    socket.on('disconnect', () => {
        console.log("Lost user: " + socket.id);
        game = removePlayer(game, socket.id);
    });
}