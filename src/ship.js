export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    this.updateSunkStatus();
  }

  isSunk() {
    return this.sunk;
  }

  updateSunkStatus() {
    this.sunk = this.hits === this.length;
  }
}
