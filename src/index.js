export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return (this.sunk = this.hits === this.length);
  }
}

// const testShip = new Ship(1);

// testShip.hit();

// testShip.isSunk();

// console.log(testShip);
