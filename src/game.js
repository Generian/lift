import { getCardCount } from './helper.js';

export function dealCards(g) {
    let game = g;
    const colors = ['diamonds', 'hearts', 'spaces', 'clubs'];
    const numbers = [2,3,4,5,6,7,8,9,10,11,12,13,14];

    let cards = [];

    for (let color of colors) {
        for (let number of numbers) {
            if (number >= game.lowestCard) {
                cards.push(color + '_' + number)
            };
        };
    };

    for (let player in game.players) {
        let hand = [];
        for (let i=0; i < getCardCount(game.round, game.maxCards); i++) {
            const randomCard = cards[Math.floor(Math.random()*cards.length)];
            cards.splice(cards.indexOf(randomCard),1);
            hand.push(randomCard)
        };
        game["players"][player]["cards"] = hand;
    };

    console.log(game);
    return game;

};



