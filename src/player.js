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
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
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

  randomGenerateShips() {
    const isVertical = () => (Math.random() > 0.5 ? true : false);

    const fourSqaureShip = () => {
      if (isVertical()) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 8);
        this.gameboard.placeShip([x, y], [x, y + 1], [x, y + 2], [x, y + 3]);
      } else {
        const y = Math.floor(Math.random() * 10);
        const x = Math.floor(Math.random() * 8);
        this.gameboard.placeShip([x, y], [x + 1, y], [x + 2, y], [x + 3, y]);
      }
    };
    const threeSqaureShip = () => {
      if (isVertical()) {
        let sucess = false;
        while (sucess === false) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y], [x, y + 1], [x, y + 2]);
        }
      } else {
        let sucess = false;
        while (sucess === false) {
          const y = Math.floor(Math.random() * 10);
          const x = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y], [x + 1, y], [x + 2, y]);
        }
      }
    };
    const twoSqaureShip = () => {
      if (isVertical()) {
        let sucess = false;
        while (sucess === false) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y], [x, y + 1]);
        }
      } else {
        let sucess = false;
        while (sucess === false) {
          const y = Math.floor(Math.random() * 10);
          const x = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y], [x + 1, y]);
        }
      }
    };
    const oneSqaureShip = () => {
      if (isVertical()) {
        let sucess = false;
        while (sucess === false) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y]);
        }
      } else {
        let sucess = false;
        while (sucess === false) {
          const y = Math.floor(Math.random() * 10);
          const x = Math.floor(Math.random() * 8);
          sucess = this.gameboard.placeShip([x, y]);
        }
      }
    };
    fourSqaureShip();
    threeSqaureShip();
    threeSqaureShip();
    twoSqaureShip();
    twoSqaureShip();
    twoSqaureShip();
    oneSqaureShip();
    oneSqaureShip();
    oneSqaureShip();
    oneSqaureShip();
  }
}
