import {
  humanPlayerBoard,
  computerPlayerBoard,
  gameLoop,
  allAttacksHuman,
  allMissesHuman,
  allAttacksComputer,
  allMissesComputer,
} from "./gameLoop.js";

console.log({ humanPlayerBoard, computerPlayerBoard });

const humanPlayerBoardUI = document.querySelector("#human-player");

const computerPlayerBoardUI = document.querySelector("#computer-player");

const statusUI = document.querySelector("#status");

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

const refreshUI = () => {
  const computerDivs = document.querySelectorAll("#computer-player > div");
  computerDivs.forEach((div) => {
    const x = div.dataset.X;
    const y = div.dataset.Y;
    const string = `[${x},${y}]`;
    if (allAttacksHuman.has(string) && allMissesHuman.has(string)) {
      div.classList.add("miss");
    } else if (allAttacksHuman.has(string)) {
      div.classList.add("hit");
    }
  });
  const humanDivs = document.querySelectorAll("#human-player > div");
  humanDivs.forEach((div) => {
    const x = div.dataset.X;
    const y = div.dataset.Y;
    const string = `[${x},${y}]`;
    if (allAttacksComputer.has(string) && allMissesComputer.has(string)) {
      div.classList.add("miss");
    } else if (allAttacksComputer.has(string)) {
      div.classList.add("hit");
    }
  });
};

generateDivsFromGameboard(humanPlayerBoard, humanPlayerBoardUI);
generateDivsFromGameboard(computerPlayerBoard, computerPlayerBoardUI);

const clickAttack = (e) => {
  const x = Number(e.target.dataset.X);
  const y = Number(e.target.dataset.Y);
  const coOrds = [x, y];
  const status = gameLoop(coOrds);
  statusUI.textContent = status;
  refreshUI();
};

computerPlayerBoardUI.addEventListener("click", clickAttack);
