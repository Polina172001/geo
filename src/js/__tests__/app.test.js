/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable linebreak-style */
function checkCoordsInput(coords) {
  return /^\[?\-?\d{1,2}\.\d{1,5}\,\s?\-?\d{1,2}\.\d{1,5}\]?/.test(coords);
}

test('check valid', () => {
  expect(checkCoordsInput('55.87973, 37.59769')).toBeTruthy();
  expect(checkCoordsInput('55.87973,37.59769')).toBeTruthy();
  expect(checkCoordsInput('(55.87973, 37.59769)')).toBeFalsy();
  expect(checkCoordsInput('[55.87973, 37.59769]')).toBeTruthy();
  expect(checkCoordsInput('[55.87973, 37.59769]')).toBeTruthy();
});
