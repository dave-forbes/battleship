import Gameboard from "./gameboard";

test("Gameboards should be able to place ships at specific coordinates by calling the ship factory function.", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(["A", 1], ["B", 1]);
  expect(gameboard.ships[0].length).toBe(2);
  expect(typeof gameboard.ships[0]).toBe("object");
  expect(gameboard.ships[0][0]).toStrictEqual([
    ["A", 1],
    ["B", 1],
  ]);
});
