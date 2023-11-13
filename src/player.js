import Gameboard from "./gameboard";

export default class Player {
  constructor(computer) {
    this.computer = computer === "computer" ? true : false;
    this.gameboard = new Gameboard();
  }
}
