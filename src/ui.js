import {
  humanPlayerBoard,
  computerPlayerBoard,
  playerTurn,
} from "./gameLoop.js";

console.log({ humanPlayerBoard, computerPlayerBoard });

const humanPlayerBoardUI = document.querySelector("#human-player");

const computerPlayerBoardUI = document.querySelector("#computer-player");

const generateDivsFromGameboard = (board, node) => {
  for (const coordinate of board) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (coordinate[2] && node !== computerPlayerBoardUI)
      cell.classList.add("ship");
    cell.dataset.X = coordinate[0];
    cell.dataset.Y = coordinate[1];
    node.appendChild(cell);
  }
};

generateDivsFromGameboard(humanPlayerBoard, humanPlayerBoardUI);
generateDivsFromGameboard(computerPlayerBoard, computerPlayerBoardUI);

const clickAttack = (e) => {
  const x = Number(e.target.dataset.X);
  const y = Number(e.target.dataset.Y);
  const array = [x, y];
  const attack = playerTurn(array);
  const node = e.target;
  if (attack === "Hit") {
    node.classList.add("hit");
  } else {
    node.classList.add("miss");
  }
};

computerPlayerBoardUI.addEventListener("click", clickAttack);
