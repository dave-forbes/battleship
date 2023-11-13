import Gameboard from "./gameboard.js";

export default class Player {
  constructor(computer) {
    this.computer = computer === "computer" ? true : false;
    this.gameboard = new Gameboard();
    this.turn = this.computer === false ? true : false;
  }

  attack(opposingPlayer, coOrds) {
    if (coOrds && !this.computer) {
      if (opposingPlayer.gameboard.recieveAttack(coOrds)) {
        opposingPlayer.gameboard.recieveAttack(coOrds);
        this.turn = false;
        opposingPlayer.turn = true;
        return true;
      } else {
        return false;
      }
      // Human Player attack
    } else {
      const x = Math.floor(Math.random() * 11);
      const y = Math.floor(Math.random() * 11);
      const coOrds = [x, y];
      if (opposingPlayer.gameboard.recieveAttack(coOrds)) {
        opposingPlayer.gameboard.recieveAttack(coOrds);
        this.turn = false;
        opposingPlayer.turn = true;
        return coOrds;
      } else {
        return false;
      }
      //Computer Player attack
    }
  }
}
