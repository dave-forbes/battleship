import GameController from "./GameController.js";

const game = GameController();

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

generateDivsFromGameboard(game.humanPlayerBoard, humanPlayerBoardUI);
generateDivsFromGameboard(game.computerPlayerBoard, computerPlayerBoardUI);

const clickAttack = (e) => {
  const x = Number(e.target.dataset.X);
  const y = Number(e.target.dataset.Y);
  const coOrds = [x, y];
  const status = game.gameLoop(coOrds);
  const statusUI = document.querySelector("#status");
  statusUI.textContent = status;
  refreshUI();
};

const refreshUI = () => {
  const computerDivs = document.querySelectorAll("#computer-player > div");
  computerDivs.forEach((div) => {
    const x = div.dataset.X;
    const y = div.dataset.Y;
    const string = `[${x},${y}]`;
    if (game.allAttacksHuman.has(string) && game.allMissesHuman.has(string)) {
      div.classList.add("miss");
    } else if (game.allAttacksHuman.has(string)) {
      div.classList.add("hit");
    }
  });
  const humanDivs = document.querySelectorAll("#human-player > div");
  humanDivs.forEach((div) => {
    const x = div.dataset.X;
    const y = div.dataset.Y;
    const string = `[${x},${y}]`;
    if (
      game.allAttacksComputer.has(string) &&
      game.allMissesComputer.has(string)
    ) {
      div.classList.add("miss");
    } else if (game.allAttacksComputer.has(string)) {
      div.classList.add("hit");
    }
  });
};

const hidePlaceShipsShowComputerFleet = () => {
  const computerFleet = document.querySelector(".computer-fleet");
  const placeShips = document.querySelector(".place-ships");
  placeShips.classList.toggle("fade-out");
  setTimeout(() => {
    placeShips.classList.toggle("hide");
    computerFleet.classList.toggle("hide");
  }, 500);
  setTimeout(() => {
    computerFleet.classList.toggle("fade-out");
  }, 750);
};

const clickClearFleet = () => {
  location.reload();
};

const clickRandomFleet = () => {
  humanPlayerBoardUI.innerHTML = "";
  const newBoard = game.generateRandomFleet();
  generateDivsFromGameboard(newBoard, humanPlayerBoardUI);
  hidePlaceShipsShowComputerFleet();
};

const dropShipUI = (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text");
  const originalTarget = document.getElementById(id);
  const size = originalTarget.dataset.size;
  const vertical = originalTarget.classList.contains("vertical");
  const x = Number(e.target.dataset.X);
  const y = Number(e.target.dataset.Y);
  const coOrds = [x, y];
  const result = game.dropShip(coOrds, size, vertical);
  if (result.newBoard) {
    originalTarget.classList.add("hide");
    humanPlayerBoardUI.innerHTML = "";
    generateDivsFromGameboard(result.newBoard, humanPlayerBoardUI);
  }
  if (result.allShipsPlaced) {
    hidePlaceShipsShowComputerFleet();
  }
};

const swapWidthAndHeight = (node) => {
  const width = node.clientWidth;
  const height = node.clientHeight;
  node.style.width = `${height}px`;
  node.style.height = `${width}px`;
};

const clickShip = (e) => {
  const node = e.target;
  const id = e.target.id;
  if (node.classList.contains("ship")) {
    swapWidthAndHeight(node);
    node.classList.toggle("vertical");
    const nodeList = document.querySelectorAll(".ship.vertical");
    let otherNodes = [...nodeList];
    otherNodes = otherNodes.filter((otherNode) => otherNode.id !== id);
    otherNodes.forEach((otherNode) => {
      if (otherNode.classList.contains("vertical")) {
        swapWidthAndHeight(otherNode);
        otherNode.classList.toggle("vertical");
      }
    });
  }
};

(function eventListeners() {
  const randomFleet = document.querySelector("#random-fleet");
  const clearFleet = document.querySelector("#clear-fleet");
  const placeShipsContainer = document.querySelector(".place-ships-container");
  placeShipsContainer.addEventListener("click", clickShip);
  humanPlayerBoardUI.addEventListener("drop", dropShipUI);
  humanPlayerBoardUI.addEventListener("dragover", (e) => e.preventDefault());
  placeShipsContainer.addEventListener("dragstart", (e) =>
    e.target.classList.contains("ship")
      ? e.dataTransfer.setData("text", e.target.id)
      : false
  );
  clearFleet.addEventListener("click", clickClearFleet);
  computerPlayerBoardUI.addEventListener("click", clickAttack);
  randomFleet.addEventListener("click", clickRandomFleet);
})();
