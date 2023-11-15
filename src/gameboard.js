import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.board = this.generateBoard();
    this.missedShots = new Set();
    this.allAttacks = new Set();
    this.ships = [];
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        board.push([i, j]);
      }
    }
    return board;
  }

  boardIndex([x, y]) {
    return x * 10 + y;
  }

  placeShip(...coOrds) {
    const coordinates = [...coOrds];

    const isCellOccupiedOrNearby = (x, y) => {
      return this.board.some((cell) => {
        const cellX = cell[0];
        const cellY = cell[1];
        return (
          (x === cellX && y === cellY && cell.length === 3) ||
          (Math.abs(x - cellX) === 1 && y === cellY && cell.length === 3) ||
          (Math.abs(x - cellX) === 1 &&
            Math.abs(y - cellY) === 1 &&
            cell.length === 3) ||
          (x === cellX && Math.abs(y - cellY) === 1 && cell.length === 3)
        );
      });
    };

    for (const [x, y] of coordinates) {
      if (isCellOccupiedOrNearby(x, y)) {
        return false;
        // Either ne of the cells is already occupied or one is nearby so do not add ship
      }
    }

    const ship = new Ship(coordinates.length);
    this.ships.push(ship);

    for (const [x, y] of coordinates) {
      const cell = this.board.find((cell) => cell[0] === x && cell[1] === y);
      cell.push(ship);
    }
    return true;
  }

  recieveAttack(coOrds) {
    if (this.allAttacks.has(JSON.stringify(coOrds))) return false;
    const index = this.boardIndex(coOrds);
    const cell = this.board[index];
    if (cell[2]) {
      cell[2].hit();
      this.allAttacks.add(JSON.stringify(coOrds));
      return "Hit";
    } else {
      this.missedShots.add(JSON.stringify(coOrds));
      this.allAttacks.add(JSON.stringify(coOrds));
      return "Miss";
    }
  }
  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }
}
