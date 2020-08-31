import { getCardCount } from '../src/helper.js';

// Initalize game

export function initializeGame() {

    let game = {
        "maxCards": 7,
        "lowestCard" : 7,
        "round": 9,
        "players": {},
        "order": [],
        "next_action_player": 0,
        "score": [[10,10,12,-2],[10,10,12,-2],[10,10,12,-2],[10,10,12,-2]]
    }

    return game;
}

export function addPlayer(g, id, name) {
    let game = g;
    game.players[id] = {
        "name": name,
        "cards": [],
        "played": [],
        "score": [],
    }

    let order = game.order;
    order.push(id);
    game.order = order;

    game = dealCards(game); // TODO: Put somewhere else

    return game;
}

export function removePlayer(g, id) {
    let game = g;
    delete game.players[id];

    let order = game.order;
    order.splice(order.indexOf(id),1);
    game.order = order;

    return game;
}

export function dealCards(g) {
    let game = g;
    const colors = [1, 2, 3, 4];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let cards = [];

    for (let color of colors) {
        for (let number of numbers) {
            if (number >= game.lowestCard) {
                cards.push(`${color}` + (number < 10 ? 0 : '') + `${number}`)
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
        game.players[player].cards = hand;
    };

    return game;

};

export function playCard(g, id, card) {
    let game = g;
    if (game.order[game.next_action_player] == id) {
        console.log(game.players[id].name, "played", card);
        // Remove played card from hand
        let cards = game.players[id].cards;
        cards.splice(cards.indexOf(card),1);
        game.players[id].cards = cards;

        // Get random card position
        const angle = -30 + Math.floor(Math.random() * 60);
        const x = -50 + Math.floor(Math.random() * 60);
        const y = -50 + Math.floor(Math.random() * 60);

        // Put played card in card pile
        game.players[id].played = [card, angle, x , y];

        if (stichCompleted(game)) {
            game = completeStich(game);
        } else {
            // Switch turn to next player
            game = turnToNextPlayer(game);
        }

    } else {
        console.log(game.players[id].name, "is trying to play a card, but it's not his turn.")
        console.log(game.next_action_player)
    }

    return game;
}

export function turnToNextPlayer(g) {
    let game = g;
    let next_action_player = game.next_action_player;
    next_action_player += 1;
    next_action_player = next_action_player % game.order.length;
    game.next_action_player = next_action_player;

    return game;
}

export function stichCompleted(game) {
    let count = 0;
    game.order.forEach((player) => {
        const played = game.players[player].played[0];
        if (!!played) {
            count += 1
        };
    });

    return count == game.order.length
}

export function completeStich(g) {
    let game = g;

    let winner = '';
    let highestCard = 0;

    // Determine highest card
    game.order.forEach((player) => {
        const played = game.players[player].played[0];
        if (!!played) {
            if (played > highestCard) {
                highestCard = played;
                winner = player
            }
        };
    });

    // Attribute stich
    // TODO

    // Reset cards
    game.order.forEach((player) => {
        game.players[player].played = [];
    });

    return game;
}