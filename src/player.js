import Gameboard from "./gameboard";

export default class Player {
  constructor(computer) {
    this.computer = computer === "computer" ? true : false;
    this.gameboard = new Gameboard();
  }

  attack(opposingPlayer, coOrds) {
    if (coOrds && !this.computer) {
      opposingPlayer.gameboard.recieveAttack(coOrds);
      // Human Player attack
    } else {
      const x = Math.floor(Math.random() * 11);
      const y = Math.floor(Math.random() * 11);
      const coOrds = [x, y];
      opposingPlayer.gameboard.recieveAttack(coOrds);
      return coOrds;
      //Computer Player attack
    }
  }
}
