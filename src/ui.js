import { humanPlayer, computerPlayer } from "./gameLoop.js";

// console.log(humanPlayer.gameboard.board);
// console.log(computerPlayer.gameboard.board);

const humanPlayerBoard = document.querySelector("#human-player");
console.log(humanPlayerBoard);
const computerPlayerBoard = document.querySelector("#computer-player");
console.log(computerPlayerBoard);

for (const coordinate of humanPlayer.gameboard.board) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (coordinate[2]) cell.classList.add("ship");
  humanPlayerBoard.appendChild(cell);
}

for (const coordinate of computerPlayer.gameboard.board) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (coordinate[2]) cell.classList.add("ship");
  computerPlayerBoard.appendChild(cell);
}
