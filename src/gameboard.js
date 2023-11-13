import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = this.generateBoard();
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        board.push([i, j]);
      }
    }
    return board;
  }

  boardIndex([x, y]) {
    return x * 11 + y;
  }

  placeShip(...coOrds) {
    const ship = new Ship(coOrds.length);
    const coordinates = [...coOrds];

    for (const coordinate of coordinates) {
      for (const cell of this.board) {
        if (
          coordinate[0] === cell[0] &&
          coordinate[1] === cell[1] &&
          cell.length === 3
        ) {
          return false;
          // Already occupied
        }
      }
    }
    for (const coordinate of coordinates) {
      for (const cell of this.board) {
        if (coordinate[0] === cell[0] && coordinate[1] === cell[1]) {
          cell.push(ship);
          // Not occupied so add ship
        }
      }
    }
    return true;
  }

  recieveAttack([x, y]) {}
}
