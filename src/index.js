// import './style.css';
import io from "socket.io-client";

import { drawGame } from './draw.js';

// Websocket setup
export const socket = io(window.location.hostname == "localhost" ? "localhost:3000" : window.location.hostname);

// Log new socket connection
socket.on('connect', () => {
    console.log('Socket connection id ' + socket.id);
});

// Draw game
socket.on('drawGame', (game) => {
    console.log('re-drawing!')
    // console.log(game)
    drawGame(game, socket.id);
});