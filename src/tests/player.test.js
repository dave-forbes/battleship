import Player from "../player.js";

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

test("Players can attack the enemy Gameboard.", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  humanPlayer.attack(computerPlayer, [1, 1]);
  expect(computerPlayer.gameboard.allAttacks.has(JSON.stringify([1, 1]))).toBe(
    true
  );
  const computerAttack = computerPlayer.attack(humanPlayer);
  expect(
    humanPlayer.gameboard.allAttacks.has(JSON.stringify(computerAttack))
  ).toBe(true);
});

test("Players can't shoot the same coordinate twice", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  humanPlayer.attack(computerPlayer, [1, 1]);
  computerPlayer.attack(humanPlayer);
  expect(humanPlayer.attack(computerPlayer, [1, 1])).toBeFalsy();
});
