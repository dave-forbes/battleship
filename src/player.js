import Gameboard from './gameboard.js';

export default class Player {
  constructor(computer) {
    this.computer = computer === 'computer' ? true : false;
    this.gameboard = new Gameboard();
  }

  attack(opposingPlayer, coOrds) {
    if (coOrds && !this.computer) {
      if (
        !opposingPlayer.gameboard.allAttacks.has(
          JSON.stringify(coOrds)
        )
      ) {
        opposingPlayer.gameboard.receiveAttack(coOrds);
        return true;
      } else {
        return false;
      }
      // Human Player attack
    } else {
      let success = false;
      let coOrds;
      while (!success) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        coOrds = [x, y];
        if (
          opposingPlayer.gameboard.allAttacks.has(
            JSON.stringify(coOrds)
          )
        ) {
          success = false;
        } else {
          success = true;
        }
      }
      opposingPlayer.gameboard.receiveAttack(coOrds);
      return coOrds;
      //Computer Player attack
    }
  }

  randomGenerateShips() {
    const isVertical = () => (Math.random() > 0.5 ? true : false);

    const placeRandomShip = (size) => {
      if (isVertical()) {
        let success = false;
        while (!success) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * (10 - size + 1));
          const coordinates = Array.from({ length: size }, (_, i) => [
            x,
            y + i,
          ]);
          success = this.gameboard.placeShip(...coordinates);
        }
      } else {
        let success = false;
        while (!success) {
          const y = Math.floor(Math.random() * 10);
          const x = Math.floor(Math.random() * (10 - size + 1));
          const coordinates = Array.from({ length: size }, (_, i) => [
            x + i,
            y,
          ]);
          success = this.gameboard.placeShip(...coordinates);
        }
      }
    };

    placeRandomShip(4);
    placeRandomShip(3);
    placeRandomShip(3);
    placeRandomShip(2);
    placeRandomShip(2);
    placeRandomShip(2);
    placeRandomShip(1);
    placeRandomShip(1);
    placeRandomShip(1);
    placeRandomShip(1);
    return this.gameboard.board;
  }
}
