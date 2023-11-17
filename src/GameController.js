import Player from "./player.js";

function GameController() {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");

  // humanPlayer.randomGenerateShips();
  computerPlayer.randomGenerateShips();

  const humanPlayerBoard = humanPlayer.gameboard.board;
  const computerPlayerBoard = computerPlayer.gameboard.board;

  const gameLoop = (coOrds) => {
    let winner = false;
    const success = humanPlayer.attack(computerPlayer, coOrds);
    if (computerPlayer.gameboard.allShipsSunk()) winner = "Human";
    if (success) computerPlayer.attack(humanPlayer);
    if (humanPlayer.gameboard.allShipsSunk()) winner = "Computer";
    return winner;
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

  function scoreboard() {
    const humanHits = allAttacksHuman.size - allMissesHuman.size;
    const humanMisses = allMissesHuman.size;
    const humanShipsSunk = computerPlayer.gameboard.ships.reduce(
      (shipsSunk, ship) => (ship.sunk === true ? ++shipsSunk : shipsSunk),
      0
    );
    const humanShipsLost = humanPlayer.gameboard.ships.reduce(
      (shipsSunk, ship) => (ship.sunk === true ? ++shipsSunk : shipsSunk),
      0
    );
    return { humanHits, humanMisses, humanShipsSunk, humanShipsLost };
  }

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
    scoreboard,
  };
}

export default GameController;
