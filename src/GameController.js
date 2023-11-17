import Player from "./player.js";

function GameController() {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");

  // humanPlayer.randomGenerateShips();
  computerPlayer.randomGenerateShips();

  const humanPlayerBoard = humanPlayer.gameboard.board;
  const computerPlayerBoard = computerPlayer.gameboard.board;

  const gameLoop = (coOrds) => {
    humanPlayer.attack(computerPlayer, coOrds);
    if (computerPlayer.gameboard.allShipsSunk())
      return "Game over, player wins";
    computerPlayer.attack(humanPlayer);
    if (humanPlayer.gameboard.allShipsSunk())
      return "Game over, computer wins!";
  };

  const dropShip = (coOrds, size, vertical) => {
    const shipCoOrds = humanPlayer.gameboard.gerenateShipCoOrds(
      coOrds,
      size,
      vertical
    );
    const newBoard = humanPlayer.gameboard.placeShip(...shipCoOrds);
    const allShipsPlaced = humanPlayer.gameboard.allShipsPlaced();
    return { newBoard, allShipsPlaced };
  };

  const generateRandomFleet = () => {
    humanPlayer.gameboard.clearShips();
    const newBoard = humanPlayer.randomGenerateShips();
    return newBoard;
  };

  const allAttacksHuman = computerPlayer.gameboard.allAttacks;
  const allMissesHuman = computerPlayer.gameboard.missedShots;
  const allAttacksComputer = humanPlayer.gameboard.allAttacks;
  const allMissesComputer = humanPlayer.gameboard.missedShots;

  return {
    humanPlayerBoard,
    computerPlayerBoard,
    allAttacksHuman,
    allAttacksComputer,
    allMissesHuman,
    allMissesComputer,
    gameLoop,
    dropShip,
    generateRandomFleet,
  };
}

export default GameController;
