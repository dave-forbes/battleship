import Player from "./player.js";

const humanPlayer = new Player();
const computerPlayer = new Player("computer");

// humanPlayer.randomGenerateShips();
computerPlayer.randomGenerateShips();

const humanPlayerBoard = humanPlayer.gameboard.board;
const computerPlayerBoard = computerPlayer.gameboard.board;

const gameLoop = (coOrds) => {
  humanPlayer.attack(computerPlayer, coOrds);
  if (computerPlayer.gameboard.allShipsSunk()) return "Game over, player wins";
  computerPlayer.attack(humanPlayer);
  if (humanPlayer.gameboard.allShipsSunk()) return "Game over, computer wins!";
};

const allAttacksHuman = computerPlayer.gameboard.allAttacks;
const allMissesHuman = computerPlayer.gameboard.missedShots;
const allAttacksComputer = humanPlayer.gameboard.allAttacks;
const allMissesComputer = humanPlayer.gameboard.missedShots;

const dragAndDropShip = (coOrds, size, vertical) => {
  if (vertical) {
    const [x, y] = coOrds;
    const coordinates = Array.from({ length: size }, (_, i) => [x + i, y]);
    console.log({ coOrds, coordinates });
    const success = humanPlayer.gameboard.placeShip(...coordinates);
    return success === true;
  } else {
    const [x, y] = coOrds;
    const coordinates = Array.from({ length: size }, (_, i) => [x, y + i]);
    console.log({ coOrds, coordinates });
    const success = humanPlayer.gameboard.placeShip(...coordinates);
    return success === true;
  }
};

export {
  humanPlayerBoard,
  computerPlayerBoard,
  gameLoop,
  allAttacksHuman,
  allMissesHuman,
  allAttacksComputer,
  allMissesComputer,
  dragAndDropShip,
  humanPlayer,
};
