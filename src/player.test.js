import Player from "./player.js";

// test("", () => {});

test("Player creates a human or computer player object.", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  expect(humanPlayer.computer).toBe(false);
  expect(computerPlayer.computer).toBe(true);
});

test("Player creates an object that contains its own gameboard.", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  expect(typeof humanPlayer.gameboard).toBe("object");
  expect(typeof computerPlayer.gameboard).toBe("object");
  expect(humanPlayer.gameboard !== computerPlayer.gameboard).toBe(true);
});

test("Players can take turns playing the game by attacking the enemy Gameboard.", () => {});
