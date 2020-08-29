const PORT = process.env.PORT || 3000;

var express = require('express');

var app = express();
var server = app.listen(PORT);

app.use(express.static('dist'));

console.log("Server running");

var socket = require('socket.io');

var io = socket(server);


let game = {
    "maxCards": 7,
    "lowestCard" : 7,
    "round": 10,
    "players": {
        'sdfgfdgdf': {
            "name": "Mark",
            "cards": []
        },
        '234rewrwe4r': {
            "name": "Steve",
            "cards": []
        },
        'zhtdifzjxfh': {
            "name": "Laine",
            "cards": []
        },
        'dfge4efefdfs': {
            "name": "Tobias",
            "cards": []
        },
    },
    "score": [[10,10,12,-2],[10,10,12,-2],[10,10,12,-2],[10,10,12,-2]]
}

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    // Log new connection in console
    console.log("New user: " + socket.id);
    
    // Emit data to all
    io.sockets.emit('drawGame', game);

    // Receive data
    socket.on('something', (name) => {
    });


    // Handle disconnect
    socket.on('disconnect', () => {
        console.log("Lost user: " + socket.id);
    });
}