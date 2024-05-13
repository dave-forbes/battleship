import Ship from '../Ship';

describe('Ship', () => {
  test('constructor initializes properties correctly', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test('hit method increments hits and updates sunk status', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
  });

  test('isSunk method returns correct value', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
