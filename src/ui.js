import {
  humanPlayerBoard,
  computerPlayerBoard,
  gameLoop,
  allAttacksHuman,
  allMissesHuman,
  allAttacksComputer,
  allMissesComputer,
  dragAndDropShip,
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

const startGame = document.querySelector("button");
const placeShips = document.querySelector(".place-ships");
const computerFleet = document.querySelector(".computer-fleet");

startGame.addEventListener("click", () => {
  computerFleet.classList.toggle("hide");
  placeShips.classList.toggle("hide");
});

// drag and drop stuff

const placeShipsContainer = document.querySelector(".place-ships-container");

placeShipsContainer.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("ship")) {
    e.dataTransfer.setData("text", e.target.id);
  }
});

humanPlayerBoardUI.addEventListener("dragover", (e) => {
  e.preventDefault();
});

humanPlayerBoardUI.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text");
  const originalTarget = document.getElementById(id);
  const originalParent = originalTarget.parentElement;
  originalParent.removeChild(originalTarget);
  const size = originalTarget.dataset.size;
  const vertical = originalTarget.classList.contains("vertical");
  const x = Number(e.target.dataset.X);
  const y = Number(e.target.dataset.Y);
  const coOrds = [x, y];
  dragAndDropShip(coOrds, size, vertical);
  humanPlayerBoardUI.innerHTML = "";
  generateDivsFromGameboard(humanPlayerBoard, humanPlayerBoardUI);
});

placeShipsContainer.addEventListener("click", (e) => {
  const node = e.target;
  if (node.classList.contains("ship")) {
    const width = node.clientWidth;
    const height = node.clientHeight;
    node.style.width = `${height}px`;
    node.style.height = `${width}px`;
    node.classList.toggle("vertical");
  }
});
