const { expr, term, factor } = require('.');

describe('expr', () => {
  it('should ...', () => {
    expect(expr('5')).toEqual([5, '']);
    expect(expr('2+3*4')).toEqual([14, '']);
    expect(expr('(2+3)*4')).toEqual([20, '']);
    expect(expr('1+11')).toEqual([12, '']);
    expect(expr('1+11+8*2')).toEqual([28, '']);
    expect(expr('3*3*3+1')).toEqual([28, '']);
    expect(expr('3*3*(3+1)')).toEqual([36, '']);
  });
});
