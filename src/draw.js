import $ from "jquery";

import { getCardCount } from './helper.js';
import { socket } from './index.js';

// Remove all elements
function EmptyFrame() {
    $( ".mainContainer" ).empty();
}

// Draw app frame

function DrawAppFrame() {
    let t = '<div id="scoreContainer" class="item item_score"></div><div id="gameContainer" class="item item_game"></div>';
    $( ".mainContainer" ).append(t);
}

// Draw player cards

function DrawCardsContainers() {
    let t = '<div id="myCards"></div>';
    let u = '<div id="playedCards"></div>';
    $(' #gameContainer ').append(t, u);
}

function DrawMyCards(game, player) {
    for (let card of game.players[player]['cards']) {
        let t = `<img id="${card}" src="./assets/cards/${card}.jpg">`;
        $( "#myCards" ).append(t);
        $( `#${card}` ).click(() => {
            console.log($(`#${card}`).attr('id'))
            socket.emit('clickCard', $(`#${card}`).attr('id'))
        });
    }
}

function DrawPlayedCards(game) {
    for (let i = game.next_action_player; i < game.next_action_player + game.order.length; i++) {
        let card = game.players[game.order[i % game.order.length]].played;
        if (card.length != 0) {
            let t = `<img src="./assets/cards/${card[0]}.jpg" style="transform: translate(${card[2]}px, ${card[3]}px) rotate(${card[1]}deg) ;">`;
            $( "#playedCards" ).append(t);
        };
    };
};

// Draw score board

function DrawScoreHeader(game) {
    let css = "[rounds] auto ";
    let c = 1;
    for (let id in game.players) {
        css = css + `[player${c}] auto `
        c += 1;
    };
    $( "#scoreContainer" ).css("grid-template-columns", css);
    let count = 1;
    for (let id in game.players) {
        let t = `<div class="item item_header" style="grid-column-start:player${count};"><span>${game.players[id].name}</span></div>`;
        $('#scoreContainer').append(t);
        count += 1;
    }
}

function DrawScoreRounds(game) {
    let css = "[header] 50px ";
    for (let i = 1; i <= game.maxCards * 2 - 1; i++) {
        css = css + `[round${i}] auto `
    };
    $( "#scoreContainer" ).css("grid-template-rows", css);
    for (let i = 1; i <= game.maxCards * 2 - 1; i++) {
        let t = `<div class="item item_round_number" style="grid-row-start:round${i};"><span>${getCardCount(i, game.maxCards)}</span></div>`;
        $('#scoreContainer').append(t);
    }
}

function DrawScoreScores(game) {
    game.order.forEach((player, j) => {
        if (game.players[player].score) {
            game.players[player].score.forEach((score, i) => {
                let u = `<div class="item player${j+1}" style="grid-row-start:round${i+1};"><span>${score}</span></div>`;
                $('#scoreContainer').append(u);
            });
        } else {
            console.log(`Scores missing for player: ${player, game.players[player].name}`);
        };
    });
};

function DrawScoreBoard(game) {
    DrawScoreHeader(game)
    DrawScoreRounds(game)
    DrawScoreScores(game)
}

// Draw full game

export function drawGame(game, player) {
    // Delete everything
    EmptyFrame();

    // Draw app rame
    DrawAppFrame();

    // Draw score board
    DrawScoreBoard(game);

    // Draw game
    DrawCardsContainers();
    DrawMyCards(game, player);
    DrawPlayedCards(game);
}