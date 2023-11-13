import Player from "./player.js";

const humanPlayer = new Player();
const computerPlayer = new Player("computer");

humanPlayer.gameboard.placeShip([0, 1]);
humanPlayer.gameboard.placeShip([4, 4]);
humanPlayer.gameboard.placeShip([9, 1]);
humanPlayer.gameboard.placeShip([3, 8]);
humanPlayer.gameboard.placeShip([2, 1], [2, 2]);
humanPlayer.gameboard.placeShip([6, 7], [7, 7]);
humanPlayer.gameboard.placeShip([9, 3], [9, 4]);
humanPlayer.gameboard.placeShip([10, 1], [10, 2], [10, 3]);
humanPlayer.gameboard.placeShip([7, 5], [8, 5], [9, 5]);
humanPlayer.gameboard.placeShip([2, 5], [3, 5], [4, 5], [5, 5]);

computerPlayer.gameboard.placeShip([0, 1]);
computerPlayer.gameboard.placeShip([4, 4]);
computerPlayer.gameboard.placeShip([9, 1]);
computerPlayer.gameboard.placeShip([3, 8]);
computerPlayer.gameboard.placeShip([2, 1], [2, 2]);
computerPlayer.gameboard.placeShip([6, 7], [7, 7]);
computerPlayer.gameboard.placeShip([9, 3], [9, 4]);
computerPlayer.gameboard.placeShip([10, 1], [10, 2], [10, 3]);
computerPlayer.gameboard.placeShip([7, 5], [8, 5], [9, 5]);
computerPlayer.gameboard.placeShip([2, 5], [3, 5], [4, 5], [5, 5]);

export { humanPlayer, computerPlayer };
