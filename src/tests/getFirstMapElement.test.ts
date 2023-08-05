import { getFirstMapElement } from '../helpers/getFirstMapElement';

describe('Testing getFirstMapElement helper', () => {
  test('Should return 1-st value of Map', () => {
    const map = new Map<string, number>();
    map.set('first', 1);
    map.set('second', 2);

    expect(getFirstMapElement(map)).toBe(1);
  });

  test('Returns undefiend if Map is empty', () => {
    const map = new Map();

    expect(getFirstMapElement(map)).toBe(undefined);
  });
});
