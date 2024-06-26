import Gameboard from '../gameboard.js';

test('Gameboards should be able to place ships at specific coordinates by calling the ship factory function.', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  expect(
    typeof gameboard.board[gameboard.boardIndex([1, 1])][2]
  ).toBe('object');
  expect(
    typeof gameboard.board[gameboard.boardIndex([2, 1])][2]
  ).toBe('object');
  expect(
    Object.hasOwn(
      gameboard.board[gameboard.boardIndex([1, 1])][2],
      'length'
    )
  ).toBe(true);
  console.log(gameboard.board[gameboard.boardIndex([1, 1])]);
});

test("Can't place ships out of range 0-9 on 10 x 10 board.", () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip([-1, 0])).toBeFalsy();
  expect(gameboard.placeShip([0, -1])).toBeFalsy();
  expect(gameboard.placeShip([0, 10])).toBeFalsy();
  expect(gameboard.placeShip([10, 0])).toBeFalsy();
});

test("Can't place a ship over co-ordinates that are already occupied", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  expect(gameboard.placeShip([1, 1], [2, 1])).toBeFalsy();
  expect(gameboard.placeShip([1, 1], [1, 2], [2, 3])).toBeFalsy();
  expect(
    gameboard.board[gameboard.boardIndex([1, 2])][2]
  ).toBeFalsy();
  expect(gameboard.placeShip([4, 1], [4, 2], [4, 3])).toBeTruthy();
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
  expect(
    gameboard.placeShip([4, 1], [4, 2], [4, 3], [4, 4])
  ).toBeTruthy();
  expect(gameboard.placeShip([3, 1])).toBeFalsy();
});

test('Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([2, 1]);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].hits).toBe(
    2
  );
  expect(gameboard.board[gameboard.boardIndex([2, 1])][2].hits).toBe(
    2
  );
  expect(
    gameboard.board[gameboard.boardIndex([1, 1])][2].isSunk()
  ).toBe(true);
  gameboard.receiveAttack([0, 2]);
  expect(gameboard.missedShots.has(JSON.stringify([0, 2]))).toBe(
    true
  );
});

test("Can't attack same coordinates twice", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.receiveAttack([1, 1])).toBe(false);
  expect(gameboard.board[gameboard.boardIndex([1, 1])][2].hits).toBe(
    1
  );
});

test('Gameboards should keep track of missed attacks so they can display them properly.', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.receiveAttack([3, 1]);
  gameboard.receiveAttack([4, 1]);
  expect(gameboard.missedShots.has(JSON.stringify([3, 1]))).toBe(
    true
  );
  expect(gameboard.missedShots.has(JSON.stringify([4, 1]))).toBe(
    true
  );
});

test('Gameboards should be able to report whether or not all of their ships have been sunk.', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.placeShip([4, 4], [4, 5], [4, 6], [4, 7], [4, 8]);
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([2, 1]);
  console.log(gameboard.ships);
  expect(gameboard.allShipsSunk()).toBe(false);
  gameboard.receiveAttack([4, 4]);
  gameboard.receiveAttack([4, 5]);
  gameboard.receiveAttack([4, 6]);
  expect(gameboard.allShipsSunk()).toBe(false);
  gameboard.receiveAttack([4, 7]);
  gameboard.receiveAttack([4, 8]);
  expect(gameboard.allShipsSunk()).toBe(true);
});

test('Gameboard has a method to clear ships which removes all placed ships', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([1, 1], [2, 1]);
  gameboard.placeShip([4, 4], [4, 5], [4, 6], [4, 7], [4, 8]);
  expect(gameboard.ships.length).toBe(2);
  expect(
    gameboard.board.every((cell) => cell.length === 2)
  ).toBeFalsy();
  gameboard.clearShips();
  expect(gameboard.ships.length).toBe(0);
  expect(
    gameboard.board.every((cell) => cell.length === 2)
  ).toBeTruthy();
});

test('Gameboard has a method to check if all ships have been placed', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip([6, 1]);
  gameboard.placeShip([8, 5]);
  gameboard.placeShip([0, 0]);
  gameboard.placeShip([9, 9]);
  expect(gameboard.allShipsPlaced()).toBeFalsy();
  gameboard.placeShip([6, 7], [6, 8]);
  gameboard.placeShip([3, 0], [4, 0]);
  gameboard.placeShip([3, 2], [4, 2]);
  expect(gameboard.allShipsPlaced()).toBeFalsy();
  gameboard.placeShip([0, 4], [0, 5], [0, 6]);
  gameboard.placeShip([2, 4], [2, 5], [2, 6]);
  gameboard.placeShip([4, 4], [4, 5], [4, 6], [4, 7]);
  console.log(gameboard.ships);
  expect(gameboard.allShipsPlaced()).toBeTruthy();
});

// test("", () => {});
