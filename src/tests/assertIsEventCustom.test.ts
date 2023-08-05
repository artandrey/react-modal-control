import { assertIsEventCustom } from '../helpers/assertIsEventCustom';

test('Custom event asserion works properly', () => {
  expect(() => assertIsEventCustom(new Event(''))).toThrow();
  expect(assertIsEventCustom(new CustomEvent(''))).toBe(undefined);
});
