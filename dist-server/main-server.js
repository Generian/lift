/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src-server/game.js":
/*!****************************!*\
  !*** ./src-server/game.js ***!
  \****************************/
/*! exports provided: initializeGame, addPlayer, removePlayer, dealCards, playCard, turnToNextPlayer, stichCompleted, completeStich */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initializeGame\", function() { return initializeGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPlayer\", function() { return addPlayer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removePlayer\", function() { return removePlayer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dealCards\", function() { return dealCards; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playCard\", function() { return playCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"turnToNextPlayer\", function() { return turnToNextPlayer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stichCompleted\", function() { return stichCompleted; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"completeStich\", function() { return completeStich; });\n/* harmony import */ var _src_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/helper.js */ \"./src/helper.js\");\n\r\n\r\n// Initalize game\r\n\r\nfunction initializeGame() {\r\n\r\n    let game = {\r\n        \"maxCards\": 7,\r\n        \"lowestCard\" : 7,\r\n        \"round\": 9,\r\n        \"players\": {},\r\n        \"order\": [],\r\n        \"next_action_player\": 0,\r\n        \"score\": [[10,10,12,-2],[10,10,12,-2],[10,10,12,-2],[10,10,12,-2]]\r\n    }\r\n\r\n    return game;\r\n}\r\n\r\nfunction addPlayer(g, id, name) {\r\n    let game = g;\r\n    game.players[id] = {\r\n        \"name\": name,\r\n        \"cards\": [],\r\n        \"played\": [],\r\n        \"score\": [],\r\n    }\r\n\r\n    let order = game.order;\r\n    order.push(id);\r\n    game.order = order;\r\n\r\n    game = dealCards(game); // TODO: Put somewhere else\r\n\r\n    return game;\r\n}\r\n\r\nfunction removePlayer(g, id) {\r\n    let game = g;\r\n    delete game.players[id];\r\n\r\n    let order = game.order;\r\n    order.splice(order.indexOf(id),1);\r\n    game.order = order;\r\n\r\n    return game;\r\n}\r\n\r\nfunction dealCards(g) {\r\n    let game = g;\r\n    const colors = [1, 2, 3, 4];\r\n    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];\r\n\r\n    let cards = [];\r\n\r\n    for (let color of colors) {\r\n        for (let number of numbers) {\r\n            if (number >= game.lowestCard) {\r\n                cards.push(`${color}` + (number < 10 ? 0 : '') + `${number}`)\r\n            };\r\n        };\r\n    };\r\n\r\n    for (let player in game.players) {\r\n        let hand = [];\r\n        for (let i=0; i < Object(_src_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"getCardCount\"])(game.round, game.maxCards); i++) {\r\n            const randomCard = cards[Math.floor(Math.random()*cards.length)];\r\n            cards.splice(cards.indexOf(randomCard),1);\r\n            hand.push(randomCard)\r\n        };\r\n        game.players[player].cards = hand;\r\n    };\r\n\r\n    return game;\r\n\r\n};\r\n\r\nfunction playCard(g, id, card) {\r\n    let game = g;\r\n    if (game.order[game.next_action_player] == id) {\r\n        console.log(game.players[id].name, \"played\", card);\r\n        // Remove played card from hand\r\n        let cards = game.players[id].cards;\r\n        cards.splice(cards.indexOf(card),1);\r\n        game.players[id].cards = cards;\r\n\r\n        // Get random card position\r\n        const angle = -30 + Math.floor(Math.random() * 60);\r\n        const x = -50 + Math.floor(Math.random() * 60);\r\n        const y = -50 + Math.floor(Math.random() * 60);\r\n\r\n        // Put played card in card pile\r\n        game.players[id].played = [card, angle, x , y];\r\n\r\n        if (stichCompleted(game)) {\r\n            game = completeStich(game);\r\n        } else {\r\n            // Switch turn to next player\r\n            game = turnToNextPlayer(game);\r\n        }\r\n\r\n    } else {\r\n        console.log(game.players[id].name, \"is trying to play a card, but it's not his turn.\")\r\n        console.log(game.next_action_player)\r\n    }\r\n\r\n    return game;\r\n}\r\n\r\nfunction turnToNextPlayer(g) {\r\n    let game = g;\r\n    let next_action_player = game.next_action_player;\r\n    next_action_player += 1;\r\n    next_action_player = next_action_player % game.order.length;\r\n    game.next_action_player = next_action_player;\r\n\r\n    return game;\r\n}\r\n\r\nfunction stichCompleted(game) {\r\n    let count = 0;\r\n    game.order.forEach((player) => {\r\n        const played = game.players[player].played[0];\r\n        if (!!played) {\r\n            count += 1\r\n        };\r\n    });\r\n\r\n    return count == game.order.length\r\n}\r\n\r\nfunction completeStich(g) {\r\n    let game = g;\r\n\r\n    let winner = '';\r\n    let highestCard = 0;\r\n\r\n    // Determine highest card\r\n    game.order.forEach((player) => {\r\n        const played = game.players[player].played[0];\r\n        if (!!played) {\r\n            if (played > highestCard) {\r\n                highestCard = played;\r\n                winner = player\r\n            }\r\n        };\r\n    });\r\n\r\n    // Attribute stich\r\n    // TODO\r\n\r\n    // Reset cards\r\n    game.order.forEach((player) => {\r\n        game.players[player].played = [];\r\n    });\r\n\r\n    return game;\r\n}\n\n//# sourceURL=webpack:///./src-server/game.js?");

/***/ }),

/***/ "./src-server/server.js":
/*!******************************!*\
  !*** ./src-server/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_server_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src-server/game.js */ \"./src-server/game.js\");\n\r\n\r\nconst PORT = process.env.PORT || 3000;\r\n\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\n\r\nvar app = express();\r\nvar server = app.listen(PORT);\r\n\r\napp.use(express.static('dist'));\r\n\r\nconsole.log(\"Server running\");\r\n\r\nvar socket = __webpack_require__(/*! socket.io */ \"socket.io\");\r\n\r\nvar io = socket(server);\r\n\r\nlet game = Object(_src_server_game_js__WEBPACK_IMPORTED_MODULE_0__[\"initializeGame\"])();\r\n\r\nio.sockets.on('connection', newConnection);\r\n\r\nfunction newConnection(socket) {\r\n    // Log new connection in console\r\n    console.log(\"New user: \" + socket.id);\r\n\r\n    // Add new player to game\r\n    game = Object(_src_server_game_js__WEBPACK_IMPORTED_MODULE_0__[\"addPlayer\"])(game, socket.id, \"Sebastian\");\r\n    \r\n    // Emit data to all\r\n    io.sockets.emit('drawGame', game);\r\n\r\n    // Receive data TODO: Remove if not used\r\n    socket.on('clickCard', (card) => {\r\n        Object(_src_server_game_js__WEBPACK_IMPORTED_MODULE_0__[\"playCard\"])(game, socket.id, card);\r\n        io.sockets.emit('drawGame', game);\r\n    });\r\n\r\n\r\n    // Handle disconnect\r\n    socket.on('disconnect', () => {\r\n        console.log(\"Lost user: \" + socket.id);\r\n        game = Object(_src_server_game_js__WEBPACK_IMPORTED_MODULE_0__[\"removePlayer\"])(game, socket.id);\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src-server/server.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! exports provided: getCardCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCardCount\", function() { return getCardCount; });\nfunction getCardCount(roundNumber, max) {\r\n    if (roundNumber > max) {\r\n        return max - (roundNumber % max);\r\n    } else {\r\n        return roundNumber;\r\n    };\r\n};\n\n//# sourceURL=webpack:///./src/helper.js?");

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src-server/server.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src-server/server.js */\"./src-server/server.js\");\n\n\n//# sourceURL=webpack:///multi_./src-server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });