import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.xMin = "A";
    this.xMax = "J";
    this.yMin = "0";
    this.yMax = "10";
    this.ships = [];
    this.hits = [];
    this.misses = [];
  }

  placeShip(...coOrds) {
    const ship = new Ship(coOrds.length);
    this.ships.push([coOrds, ship]);
  }
}
