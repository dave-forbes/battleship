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
  const winner = game.gameLoop(coOrds);
  refreshUI();
  const score = game.scoreboard();
  if (winner === "Human") {
    const computerFleet = document.querySelector("div.computer-fleet");
    const playerWins = document.querySelector("div.player-wins");
    hideXShowY(computerFleet, playerWins);
    playerWins.style.display = "grid";
    playerWins.innerHTML = `<h1>You won!</h1>
    <h3>Your hits: ${score.humanHits}</h3>
    <h3>Your misses: ${score.humanMisses}</h3>
    <h3>Your ships lost: ${score.humanShipsLost}</h3>
    <button id="play-again">Play Again?</button>`;
    const playAgain = document.querySelector("#play-again");
    playAgain.addEventListener("click", clickClearFleet);
  } else if (winner === "Computer") {
    const playerFleet = document.querySelector("div.player-fleet");
    const computerWins = document.querySelector("div.computer-wins");
    hideXShowY(playerFleet, computerWins);
    computerWins.style.display = "grid";
    computerWins.innerHTML = `<h1>Computer won!</h1>
    <h3>Your hits: ${score.humanHits}</h3>
    <h3>Your misses: ${score.humanMisses}</h3>
    <h3>Computer ships sunk: ${score.humanShipsSunk}</h3>
    <button id="play-again">Play Again?</button>`;
    const playAgain = document.querySelector("#play-again");
    playAgain.addEventListener("click", clickClearFleet);
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

const hideXShowY = (nodeX, nodeY) => {
  nodeX.classList.toggle("fade-out");
  setTimeout(() => {
    nodeX.classList.toggle("hide");
    nodeY.classList.toggle("hide");
  }, 500);
  setTimeout(() => {
    nodeY.classList.toggle("fade-out");
  }, 750);
};

const clickClearFleet = () => {
  location.reload();
};

const clickRandomFleet = () => {
  humanPlayerBoardUI.innerHTML = "";
  const newBoard = game.generateRandomFleet();
  generateDivsFromGameboard(newBoard, humanPlayerBoardUI);
  const computerFleet = document.querySelector(".computer-fleet");
  const placeShips = document.querySelector(".place-ships");
  hideXShowY(placeShips, computerFleet);
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
    const computerFleet = document.querySelector(".computer-fleet");
    const placeShips = document.querySelector(".place-ships");
    hideXShowY(placeShips, computerFleet);
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
