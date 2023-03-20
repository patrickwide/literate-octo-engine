const checkSpeed = require('../speedDetector/checkSpeed');

describe('checkSpeed', () => {
  test('returns "Invalid input. Please enter a positive number." when speed is not a number', () => {
    expect(checkSpeed('not a number')).toBe('Invalid input. Please enter a positive number.');
  });

  test('returns "Invalid input. Please enter a positive number." when speed is a negative number', () => {
    expect(checkSpeed(-10)).toBe('Invalid input. Please enter a positive number.');
  });

  test('returns "Points: 0" when speed is less than or equal to the speed limit', () => {
    expect(checkSpeed(70)).toBe('Points: 0');
    expect(checkSpeed(65)).toBe('Points: 0');
  });

  test('returns "Points: x" when speed is greater than the speed limit, where x is the number of demerit points', () => {
    expect(checkSpeed(75)).toBe('Points: 1');
    expect(checkSpeed(100)).toBe('Points: 6');
  });

  test('returns "License suspended." when demerit points are greater than 12', () => {
    expect(checkSpeed(145)).toBe('License suspended.');
  });
});
