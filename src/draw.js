import $ from "jquery";

import { getCardCount } from './helper.js';

function DrawScoreHeader(game) {
    let count = 1;
    for (let id in game.players) {
        let t = `<div class="item item_header player${count}"><span>${game.players[id].name}</span></div>`;
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
    for (const [i, score] of game.score.entries()) {
        let count = 1;
        for (let id in game.players) {
            let u = `<div class="item player${count}" style="grid-row-start:round${i+1};"><span>${score[count-1]}</span></div>`;
            $('#scoreContainer').append(u);
            count += 1;
        }
    }
}

function DrawScoreBoard(game) {
    DrawScoreHeader(game)
    DrawScoreRounds(game)
    DrawScoreScores(game)
}

export function drawGame(game) {
    DrawScoreBoard(game)
}