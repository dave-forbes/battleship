function Ship(length, hits, sunk) {
  return {
    length,
    hits,
    sunk,
    hit() {
      this.hits++;
    },
  };
}

export default Ship;

// const exampleShip = Ship(2, 3, false);

// console.log(exampleShip);

// exampleShip.hit();

// console.log(exampleShip);
