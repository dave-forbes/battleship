/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GameController.js":
/*!*******************************!*\
  !*** ./src/GameController.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\nfunction GameController() {\n  const humanPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const computerPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"computer\");\n\n  // humanPlayer.randomGenerateShips();\n  computerPlayer.randomGenerateShips();\n\n  const humanPlayerBoard = humanPlayer.gameboard.board;\n  const computerPlayerBoard = computerPlayer.gameboard.board;\n\n  const gameLoop = (coOrds) => {\n    let winner = false;\n    const success = humanPlayer.attack(computerPlayer, coOrds);\n    if (computerPlayer.gameboard.allShipsSunk()) winner = \"Human\";\n    if (success) computerPlayer.attack(humanPlayer);\n    if (humanPlayer.gameboard.allShipsSunk()) winner = \"Computer\";\n    return winner;\n  };\n\n  const dropShip = (coOrds, size, vertical) => {\n    const shipCoOrds = humanPlayer.gameboard.gerenateShipCoOrds(\n      coOrds,\n      size,\n      vertical\n    );\n    const newBoard = humanPlayer.gameboard.placeShip(...shipCoOrds);\n    const allShipsPlaced = humanPlayer.gameboard.allShipsPlaced();\n    return { newBoard, allShipsPlaced };\n  };\n\n  const generateRandomFleet = () => {\n    humanPlayer.gameboard.clearShips();\n    const newBoard = humanPlayer.randomGenerateShips();\n    return newBoard;\n  };\n\n  const allAttacksHuman = computerPlayer.gameboard.allAttacks;\n  const allMissesHuman = computerPlayer.gameboard.missedShots;\n  const allAttacksComputer = humanPlayer.gameboard.allAttacks;\n  const allMissesComputer = humanPlayer.gameboard.missedShots;\n\n  function scoreboard() {\n    const humanHits = allAttacksHuman.size - allMissesHuman.size;\n    const humanMisses = allMissesHuman.size;\n    const humanShipsSunk = computerPlayer.gameboard.ships.reduce(\n      (shipsSunk, ship) => (ship.sunk === true ? ++shipsSunk : shipsSunk),\n      0\n    );\n    const humanShipsLost = humanPlayer.gameboard.ships.reduce(\n      (shipsSunk, ship) => (ship.sunk === true ? ++shipsSunk : shipsSunk),\n      0\n    );\n    return { humanHits, humanMisses, humanShipsSunk, humanShipsLost };\n  }\n\n  return {\n    humanPlayerBoard,\n    computerPlayerBoard,\n    allAttacksHuman,\n    allAttacksComputer,\n    allMissesHuman,\n    allMissesComputer,\n    gameLoop,\n    dropShip,\n    generateRandomFleet,\n    scoreboard,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameController);\n\n\n//# sourceURL=webpack://battleship/./src/GameController.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = this.generateBoard();\n    this.missedShots = new Set();\n    this.allAttacks = new Set();\n    this.ships = [];\n  }\n\n  generateBoard() {\n    let board = [];\n    for (let i = 0; i <= 9; i++) {\n      for (let j = 0; j <= 9; j++) {\n        board.push([i, j]);\n      }\n    }\n    return board;\n  }\n\n  boardIndex([x, y]) {\n    return x * 10 + y;\n  }\n\n  gerenateShipCoOrds = (coOrds, size, vertical) => {\n    if (vertical) {\n      const [x, y] = coOrds;\n      const coordinates = Array.from({ length: size }, (_, i) => [x + i, y]);\n      return coordinates;\n    } else {\n      const [x, y] = coOrds;\n      const coordinates = Array.from({ length: size }, (_, i) => [x, y + i]);\n      return coordinates;\n    }\n  };\n\n  placeShip(...coOrds) {\n    const coordinates = [...coOrds];\n\n    const inapropriatePlacement = (x, y) => {\n      return this.board.some((cell) => {\n        const cellX = cell[0];\n        const cellY = cell[1];\n        return (\n          x > 9 ||\n          x < 0 ||\n          y > 9 ||\n          y < 0 ||\n          (x === cellX && y === cellY && cell.length === 3) ||\n          (Math.abs(x - cellX) === 1 && y === cellY && cell.length === 3) ||\n          (Math.abs(x - cellX) === 1 &&\n            Math.abs(y - cellY) === 1 &&\n            cell.length === 3) ||\n          (x === cellX && Math.abs(y - cellY) === 1 && cell.length === 3)\n        );\n      });\n    };\n\n    for (const [x, y] of coordinates) {\n      if (inapropriatePlacement(x, y)) {\n        return false;\n        // Either coordinates not between 0-9 or one of the cells is already occupiedone is nearby, so do not add ship.\n      }\n    }\n\n    const ship = new _ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](coordinates.length);\n    this.ships.push(ship);\n\n    for (const [x, y] of coordinates) {\n      const cell = this.board.find((cell) => cell[0] === x && cell[1] === y);\n      cell.push(ship);\n    }\n    return this.board;\n  }\n\n  recieveAttack(coOrds) {\n    if (this.allAttacks.has(JSON.stringify(coOrds))) return false;\n    const index = this.boardIndex(coOrds);\n    const cell = this.board[index];\n    if (cell[2]) {\n      cell[2].hit();\n      this.allAttacks.add(JSON.stringify(coOrds));\n      return \"Hit\";\n    } else {\n      this.missedShots.add(JSON.stringify(coOrds));\n      this.allAttacks.add(JSON.stringify(coOrds));\n      return \"Miss\";\n    }\n  }\n  allShipsSunk() {\n    return this.ships.every((ship) => ship.sunk === true);\n  }\n\n  clearShips() {\n    this.board = this.generateBoard();\n    this.ships = [];\n  }\n\n  allShipsPlaced() {\n    return this.ships.length === 10;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\n\nclass Player {\n  constructor(computer) {\n    this.computer = computer === \"computer\" ? true : false;\n    this.gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  attack(opposingPlayer, coOrds) {\n    if (coOrds && !this.computer) {\n      if (!opposingPlayer.gameboard.allAttacks.has(JSON.stringify(coOrds))) {\n        opposingPlayer.gameboard.recieveAttack(coOrds);\n        return true;\n      } else {\n        return false;\n      }\n      // Human Player attack\n    } else {\n      let success = false;\n      let coOrds;\n      while (!success) {\n        const x = Math.floor(Math.random() * 10);\n        const y = Math.floor(Math.random() * 10);\n        coOrds = [x, y];\n        if (opposingPlayer.gameboard.allAttacks.has(JSON.stringify(coOrds))) {\n          success = false;\n        } else {\n          success = true;\n        }\n      }\n      opposingPlayer.gameboard.recieveAttack(coOrds);\n      return coOrds;\n      //Computer Player attack\n    }\n  }\n\n  randomGenerateShips() {\n    const isVertical = () => (Math.random() > 0.5 ? true : false);\n\n    const placeRandomShip = (size) => {\n      if (isVertical()) {\n        let success = false;\n        while (!success) {\n          const x = Math.floor(Math.random() * 10);\n          const y = Math.floor(Math.random() * (10 - size + 1));\n          const coordinates = Array.from({ length: size }, (_, i) => [\n            x,\n            y + i,\n          ]);\n          success = this.gameboard.placeShip(...coordinates);\n        }\n      } else {\n        let success = false;\n        while (!success) {\n          const y = Math.floor(Math.random() * 10);\n          const x = Math.floor(Math.random() * (10 - size + 1));\n          const coordinates = Array.from({ length: size }, (_, i) => [\n            x + i,\n            y,\n          ]);\n          success = this.gameboard.placeShip(...coordinates);\n        }\n      }\n    };\n\n    placeRandomShip(4);\n    placeRandomShip(3);\n    placeRandomShip(3);\n    placeRandomShip(2);\n    placeRandomShip(2);\n    placeRandomShip(2);\n    placeRandomShip(1);\n    placeRandomShip(1);\n    placeRandomShip(1);\n    placeRandomShip(1);\n    return this.gameboard.board;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n    this.sunk = false;\n  }\n\n  hit() {\n    this.hits++;\n    this.isSunk();\n  }\n\n  isSunk() {\n    return (this.sunk = this.hits === this.length);\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameController.js */ \"./src/GameController.js\");\n\n\nconst game = (0,_GameController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\nconst humanPlayerBoardUI = document.querySelector(\"#human-player\");\n\nconst computerPlayerBoardUI = document.querySelector(\"#computer-player\");\n\nconst generateDivsFromGameboard = (board, node) => {\n  for (const coordinate of board) {\n    const cell = document.createElement(\"div\");\n    cell.classList.add(\"cell\");\n    if (coordinate[2] && node !== computerPlayerBoardUI)\n      cell.classList.add(\"ship\");\n    cell.dataset.X = coordinate[0];\n    cell.dataset.Y = coordinate[1];\n    node.appendChild(cell);\n  }\n};\n\ngenerateDivsFromGameboard(game.humanPlayerBoard, humanPlayerBoardUI);\ngenerateDivsFromGameboard(game.computerPlayerBoard, computerPlayerBoardUI);\n\nconst clickAttack = (e) => {\n  const x = Number(e.target.dataset.X);\n  const y = Number(e.target.dataset.Y);\n  const coOrds = [x, y];\n  const winner = game.gameLoop(coOrds);\n  refreshUI();\n  const score = game.scoreboard();\n  if (winner === \"Human\") {\n    const computerFleet = document.querySelector(\"div.computer-fleet\");\n    const playerWins = document.querySelector(\"div.player-wins\");\n    hideXShowY(computerFleet, playerWins);\n    playerWins.style.display = \"grid\";\n    playerWins.innerHTML = `<h1>You won!</h1>\n    <h3>Your hits: ${score.humanHits}</h3>\n    <h3>Your misses: ${score.humanMisses}</h3>\n    <h3>Your ships lost: ${score.humanShipsLost}</h3>\n    <button id=\"play-again\">Play Again?</button>`;\n    const playAgain = document.querySelector(\"#play-again\");\n    playAgain.addEventListener(\"click\", clickClearFleet);\n  } else if (winner === \"Computer\") {\n    const playerFleet = document.querySelector(\"div.player-fleet\");\n    const computerWins = document.querySelector(\"div.computer-wins\");\n    hideXShowY(playerFleet, computerWins);\n    computerWins.style.display = \"grid\";\n    computerWins.innerHTML = `<h1>Computer won!</h1>\n    <h3>Your hits: ${score.humanHits}</h3>\n    <h3>Your misses: ${score.humanMisses}</h3>\n    <h3>Computer ships sunk: ${score.humanShipsSunk}</h3>\n    <button id=\"play-again\">Play Again?</button>`;\n    const playAgain = document.querySelector(\"#play-again\");\n    playAgain.addEventListener(\"click\", clickClearFleet);\n  }\n};\n\nconst refreshUI = () => {\n  const computerDivs = document.querySelectorAll(\"#computer-player > div\");\n  computerDivs.forEach((div) => {\n    const x = div.dataset.X;\n    const y = div.dataset.Y;\n    const string = `[${x},${y}]`;\n    if (game.allAttacksHuman.has(string) && game.allMissesHuman.has(string)) {\n      div.classList.add(\"miss\");\n    } else if (game.allAttacksHuman.has(string)) {\n      div.classList.add(\"hit\");\n    }\n  });\n  const humanDivs = document.querySelectorAll(\"#human-player > div\");\n  humanDivs.forEach((div) => {\n    const x = div.dataset.X;\n    const y = div.dataset.Y;\n    const string = `[${x},${y}]`;\n    if (\n      game.allAttacksComputer.has(string) &&\n      game.allMissesComputer.has(string)\n    ) {\n      div.classList.add(\"miss\");\n    } else if (game.allAttacksComputer.has(string)) {\n      div.classList.add(\"hit\");\n    }\n  });\n};\n\nconst hideXShowY = (nodeX, nodeY) => {\n  nodeX.classList.toggle(\"fade-out\");\n  setTimeout(() => {\n    nodeX.classList.toggle(\"hide\");\n    nodeY.classList.toggle(\"hide\");\n  }, 500);\n  setTimeout(() => {\n    nodeY.classList.toggle(\"fade-out\");\n  }, 750);\n};\n\nconst clickClearFleet = () => {\n  location.reload();\n};\n\nconst clickRandomFleet = () => {\n  humanPlayerBoardUI.innerHTML = \"\";\n  const newBoard = game.generateRandomFleet();\n  generateDivsFromGameboard(newBoard, humanPlayerBoardUI);\n  const computerFleet = document.querySelector(\".computer-fleet\");\n  const placeShips = document.querySelector(\".place-ships\");\n  hideXShowY(placeShips, computerFleet);\n};\n\nconst dropShipUI = (e) => {\n  e.preventDefault();\n  const id = e.dataTransfer.getData(\"text\");\n  const originalTarget = document.getElementById(id);\n  const size = originalTarget.dataset.size;\n  const vertical = originalTarget.classList.contains(\"vertical\");\n  const x = Number(e.target.dataset.X);\n  const y = Number(e.target.dataset.Y);\n  const coOrds = [x, y];\n  const result = game.dropShip(coOrds, size, vertical);\n  if (result.newBoard) {\n    originalTarget.classList.add(\"hide\");\n    humanPlayerBoardUI.innerHTML = \"\";\n    generateDivsFromGameboard(result.newBoard, humanPlayerBoardUI);\n  }\n  if (result.allShipsPlaced) {\n    const computerFleet = document.querySelector(\".computer-fleet\");\n    const placeShips = document.querySelector(\".place-ships\");\n    hideXShowY(placeShips, computerFleet);\n  }\n};\n\nconst swapWidthAndHeight = (node) => {\n  const width = node.clientWidth;\n  const height = node.clientHeight;\n  node.style.width = `${height}px`;\n  node.style.height = `${width}px`;\n};\n\nconst clickShip = (e) => {\n  const node = e.target;\n  const id = e.target.id;\n  if (node.classList.contains(\"ship\")) {\n    swapWidthAndHeight(node);\n    node.classList.toggle(\"vertical\");\n    const nodeList = document.querySelectorAll(\".ship.vertical\");\n    let otherNodes = [...nodeList];\n    otherNodes = otherNodes.filter((otherNode) => otherNode.id !== id);\n    otherNodes.forEach((otherNode) => {\n      if (otherNode.classList.contains(\"vertical\")) {\n        swapWidthAndHeight(otherNode);\n        otherNode.classList.toggle(\"vertical\");\n      }\n    });\n  }\n};\n\n(function eventListeners() {\n  const randomFleet = document.querySelector(\"#random-fleet\");\n  const clearFleet = document.querySelector(\"#clear-fleet\");\n  const placeShipsContainer = document.querySelector(\".place-ships-container\");\n  placeShipsContainer.addEventListener(\"click\", clickShip);\n  humanPlayerBoardUI.addEventListener(\"drop\", dropShipUI);\n  humanPlayerBoardUI.addEventListener(\"dragover\", (e) => e.preventDefault());\n  placeShipsContainer.addEventListener(\"dragstart\", (e) =>\n    e.target.classList.contains(\"ship\")\n      ? e.dataTransfer.setData(\"text\", e.target.id)\n      : false\n  );\n  clearFleet.addEventListener(\"click\", clickClearFleet);\n  computerPlayerBoardUI.addEventListener(\"click\", clickAttack);\n  randomFleet.addEventListener(\"click\", clickRandomFleet);\n})();\n\n\n//# sourceURL=webpack://battleship/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ui.js");
/******/ 	
/******/ })()
;