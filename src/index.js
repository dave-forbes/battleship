function Ship(length, hits, sunk) {
  return {
    length,
    hits,
    sunk,
    hit() {
      this.hits++;
    },
    isSunk() {
      if (this.length === this.hits) {
        this.sunk = true;
        return true;
      } else {
        this.sunk = false;
        return false;
      }
    },
  };
}

export default Ship;

// const exampleShip = Ship(2, 3, false);

// console.log(exampleShip);

// exampleShip.hit();

// console.log(exampleShip);
