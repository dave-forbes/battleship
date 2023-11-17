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

computerPlayerBoardUI.addEventListener("click", clickAttack);

const randomFleet = document.querySelector("#random-fleet");
const clearFleet = document.querySelector("#clear-fleet");
const placeShips = document.querySelector(".place-ships");
const computerFleet = document.querySelector(".computer-fleet");

function hidePlaceShipsShowComputerFleet() {
  computerFleet.classList.toggle("hide");
  placeShips.classList.toggle("hide");
}

function clickClearFleet() {
  // humanPlayerBoardUI.innerHTML = "";
  // humanPlayer.gameboard.clearShips();
  // const shipNodes = document.querySelectorAll(".ship.hide");
  // shipNodes.forEach((shipNode) => shipNode.classList.toggle("hide"));
  // generateDivsFromGameboard(
  //   game.humanPlayer.gameboard.board,
  //   humanPlayerBoardUI
  // );
  // const verticalShips = document.querySelectorAll(".ship.vertical");
  // verticalShips.forEach((verticalShip) => {
  //   verticalShip.classList.toggle("vertical");
  //   swapWidthAndHeight(verticalShip);
  // });
  location.reload();
}

clearFleet.addEventListener("click", clickClearFleet);

randomFleet.addEventListener("click", () => {
  humanPlayerBoardUI.innerHTML = "";
  game.humanPlayer.gameboard.clearShips();
  game.humanPlayer.randomGenerateShips();
  generateDivsFromGameboard(
    game.humanPlayer.gameboard.board,
    humanPlayerBoardUI
  );
  hidePlaceShipsShowComputerFleet();
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

function dropShipUI(e) {
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
}

humanPlayerBoardUI.addEventListener("drop", dropShipUI);

function swapWidthAndHeight(node) {
  const width = node.clientWidth;
  const height = node.clientHeight;
  node.style.width = `${height}px`;
  node.style.height = `${width}px`;
}

function clickShip(e) {
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
}

placeShipsContainer.addEventListener("click", clickShip);
