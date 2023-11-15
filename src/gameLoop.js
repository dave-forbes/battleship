import Player from "./player.js";

const humanPlayer = new Player();
const computerPlayer = new Player("computer");

humanPlayer.randomGenerateShips();
computerPlayer.randomGenerateShips();

const humanPlayerBoard = humanPlayer.gameboard.board;
const computerPlayerBoard = computerPlayer.gameboard.board;

const playerTurn = (array) => {
  return humanPlayer.attack(computerPlayer, array);
};

// if (computerPlayer.gameboard.allShipsSunk()) return "Game over, player wins";
// computerPlayer.attack(humanPlayer);
// if (humanPlayer.gameboard.allShipsSunk()) return "Game over, computer wins!";
// return "Players turn...";

export { humanPlayerBoard, computerPlayerBoard, playerTurn };
