test('Check if JEST is working', () => {
  const letter = 'A';

  expect(letter).toBe('A');
  expect(letter).toBeNaN;
});
