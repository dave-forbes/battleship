import Gameboard from "./gameboard";

test("Gameboards should be able to place ships at specific coordinates by calling the ship factory function.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 1], [1, 1]);
  expect(typeof gameboard.board[gameboard.boardIndex([0, 1])][2]).toBe(
    "object"
  );
  expect(typeof gameboard.board[gameboard.boardIndex([1, 1])][2]).toBe(
    "object"
  );
  expect(
    Object.hasOwn(
      typeof gameboard.board[gameboard.boardIndex([1, 1])][2],
      "length"
    )
  ).toBe(true);
  console.log(gameboard.board[gameboard.boardIndex([1, 1])]);
});

test("Can't place a ship over co-ordinates that are already occupied", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 1], [1, 1]);
  expect(gameboard.placeShip([0, 1], [1, 1])).toBe(false);
  expect(gameboard.placeShip([1, 1], [1, 2], [2, 3])).toBe(false);
  expect(gameboard.placeShip([3, 1], [3, 2], [3, 3])).toBe(true);
});

test.only("Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([0, 1], [1, 1]);
  gameboard.recieveAttack([0, 1]);
  gameboard.recieveAttack([1, 1]);
  expect(gameboard.board[gameboard.boardIndex([0, 1])][2].hits).toBe(2);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].hits).toBe(2);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].isSunk()).toBe(true);
  gameboard.recieveAttack([0, 2]);
  expect(gameboard.missedShots.has(JSON.stringify([0, 2]))).toBe(true);
});
