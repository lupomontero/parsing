const { expr, term, factor } = require('.');

const testData = [
  ['5', [5, '']],
  ['2+3*4', [14, '']],
  ['(2+3)*4', [20, '']],
  ['1+11', [12, '']],
  ['1+11+8*2', [28, '']],
  ['3*3*3+1', [28, '']],
  ['3*3*(3+1)', [36, '']],
  ['1*-1', [-1, '']],
  ['2*-3', [-6, '']],
  ['2*(-3)', [-6, '']],
  ['1+-1', [0, '']],
];

describe('expr', () => {
  testData.forEach(([input, expected]) => {
    it(`should return ${expected} for input "${input}"`, () => {
      expect(expr(input)).toEqual(expected);
    });
  });

  it('should ...', () => {
    // console.log(expr('1/0'));
  });
});
