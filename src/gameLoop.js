import Player from "./player.js";

const humanPlayer = new Player();
const computerPlayer = new Player("computer");

humanPlayer.randomGenerateShips();
computerPlayer.randomGenerateShips();

const humanPlayerBoard = humanPlayer.gameboard.board;
const computerPlayerBoard = computerPlayer.gameboard.board;

const gameLoop = (coOrds) => {
  humanPlayer.attack(computerPlayer, coOrds);
  if (computerPlayer.gameboard.allShipsSunk()) return "Game over, player wins";
  computerPlayer.attack(humanPlayer);
  if (humanPlayer.gameboard.allShipsSunk()) return "Game over, computer wins!";
  return "Players turn...";
};

const allAttacksHuman = computerPlayer.gameboard.allAttacks;
const allMissesHuman = computerPlayer.gameboard.missedShots;
const allAttacksComputer = humanPlayer.gameboard.allAttacks;
const allMissesComputer = humanPlayer.gameboard.missedShots;

export {
  humanPlayerBoard,
  computerPlayerBoard,
  gameLoop,
  allAttacksHuman,
  allMissesHuman,
  allAttacksComputer,
  allMissesComputer,
};
