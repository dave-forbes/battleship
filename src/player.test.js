import Player from "./player.js";

// test("", () => {});

test("Player creates a human or computer player object.", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  expect(humanPlayer.computer).toBe(false);
  expect(computerPlayer.computer).toBe(true);
});
