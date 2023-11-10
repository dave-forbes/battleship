import Ship from "./ship";

test("Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.", () => {
  const testShip = new Ship(2);
  expect(Object.hasOwn(testShip, "length")).toBe(true);
});

test("Ships should have a hit() function that increases the number of ‘hits’ in your ship.", () => {
  const testShip = new Ship(2);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test("isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.", () => {
  const testShip = new Ship(2);
  expect(testShip.isSunk()).toBe(false);
  const testShip2 = new Ship(2);
  testShip2.hit();
  testShip2.hit();
  testShip2.isSunk();
  expect(testShip2.isSunk()).toBe(true);
  expect(testShip2.sunk).toBe(true);
});
