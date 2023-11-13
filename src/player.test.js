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

test("Players can attack the enemy Gameboard.", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  humanPlayer.attack(computerPlayer, [0, 1]);
  expect(computerPlayer.gameboard.allAttacks.has(JSON.stringify([0, 1]))).toBe(
    true
  );
  const computerAttack = computerPlayer.attack(humanPlayer);
  expect(
    humanPlayer.gameboard.allAttacks.has(JSON.stringify(computerAttack))
  ).toBe(true);
});

test("Players turn changes after attacking", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  humanPlayer.attack(computerPlayer, [0, 1]);
  expect(humanPlayer.turn).toBeFalsy();
  expect(computerPlayer.turn).toBeTruthy();
  computerPlayer.attack(humanPlayer);
  expect(computerPlayer.turn).toBeFalsy();
  expect(humanPlayer.turn).toBeTruthy();
});

test("Players can't shoot the same coordinate twice", () => {
  const humanPlayer = new Player();
  const computerPlayer = new Player("computer");
  humanPlayer.attack(computerPlayer, [0, 1]);
  computerPlayer.attack(humanPlayer);
  const humanPlayerSecondTurn = humanPlayer.attack(computerPlayer, [0, 1]);
  expect(humanPlayerSecondTurn).toBeFalsy();
  expect(humanPlayer.turn).toBeTruthy();
});
