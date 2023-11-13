import Gameboard from "./gameboard.js";

test("Gameboards should be able to place ships at specific coordinates by calling the ship factory function.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  expect(typeof gameboard.board[gameboard.boardIndex([1, 1])][2]).toBe(
    "object"
  );
  expect(typeof gameboard.board[gameboard.boardIndex([2, 1])][2]).toBe(
    "object"
  );
  expect(
    Object.hasOwn(gameboard.board[gameboard.boardIndex([1, 1])][2], "length")
  ).toBe(true);
  console.log(gameboard.board[gameboard.boardIndex([1, 1])]);
});

test("Can't place a ship over co-ordinates that are already occupied", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  expect(gameboard.placeShip([1, 1], [2, 1])).toBe(false);
  expect(gameboard.placeShip([1, 1], [1, 2], [2, 3])).toBe(false);
  expect(gameboard.board[gameboard.boardIndex([1, 2])][2]).toBe(undefined);
  expect(gameboard.placeShip([4, 1], [4, 2], [4, 3])).toBe(true);
});

test("Can't place a ship too close to another", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  expect(gameboard.placeShip([0, 0])).toBeFalsy();
  expect(gameboard.placeShip([0, 1])).toBeFalsy();
  expect(gameboard.placeShip([0, 2])).toBeFalsy();
  expect(gameboard.placeShip([1, 0])).toBeFalsy();
  expect(gameboard.placeShip([2, 0])).toBeFalsy();
  expect(gameboard.placeShip([1, 2])).toBeFalsy();
  expect(gameboard.placeShip([2, 1])).toBeFalsy();
  expect(gameboard.placeShip([2, 2])).toBeFalsy();
  expect(gameboard.placeShip([4, 1], [4, 2], [4, 3], [4, 4])).toBeTruthy();
  expect(gameboard.placeShip([3, 1])).toBeFalsy();
});

test("Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.recieveAttack([1, 1]);
  gameboard.recieveAttack([2, 1]);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].hits).toBe(2);
  expect(gameboard.board[gameboard.boardIndex([2, 1])][2].hits).toBe(2);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].isSunk()).toBe(true);
  gameboard.recieveAttack([0, 2]);
  expect(gameboard.missedShots.has(JSON.stringify([0, 2]))).toBe(true);
});

test("Can't attack same coordinates twice", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.recieveAttack([1, 1]);
  gameboard.recieveAttack([1, 1]);
  expect(gameboard.recieveAttack([1, 1])).toBe(false);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].hits).toBe(1);
});

test("Gameboards should keep track of missed attacks so they can display them properly.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.recieveAttack([3, 1]);
  gameboard.recieveAttack([4, 1]);
  expect(gameboard.missedShots.has(JSON.stringify([3, 1]))).toBe(true);
  expect(gameboard.missedShots.has(JSON.stringify([4, 1]))).toBe(true);
});

test("Gameboards should be able to report whether or not all of their ships have been sunk.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.placeShip([4, 4], [4, 5], [4, 6], [4, 7], [4, 8]);
  gameboard.recieveAttack([1, 1]);
  gameboard.recieveAttack([2, 1]);
  expect(gameboard.allShipsSunk()).toBe(false);
  gameboard.recieveAttack([4, 4]);
  gameboard.recieveAttack([4, 5]);
  gameboard.recieveAttack([4, 6]);
  expect(gameboard.allShipsSunk()).toBe(false);
  gameboard.recieveAttack([4, 7]);
  gameboard.recieveAttack([4, 8]);
  expect(gameboard.allShipsSunk()).toBe(true);
});

// test("", () => {});
