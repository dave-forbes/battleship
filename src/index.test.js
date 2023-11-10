import Ship from "./index";

test("Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.", () => {
  const exampleShip = Ship(2, 3, false);
  expect(Object.hasOwn(exampleShip, "length")).toBe(true);
  expect(Object.hasOwn(exampleShip, "hits")).toBe(true);
  expect(Object.hasOwn(exampleShip, "sunk")).toBe(true);
});

test("Ships should have a hit() function that increases the number of ‘hits’ in your ship.", () => {
  const exampleShip = Ship(2, 0, false);
  exampleShip.hit();
  expect(exampleShip.hits).toBe(1);
});
