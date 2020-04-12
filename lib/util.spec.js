const { char, digit, some, int, seq, choice } = require('./util');

describe('char', () => {
  it('should ...', () => {
    expect(char('a')('a')).toEqual(['a', '']);
    expect(char('a')('abc')).toEqual(['a', 'bc']);
    expect(char('1')('1')).toEqual(['1', '']);
    expect(char('a')('')).toEqual([]);
    expect(char('a')('123')).toEqual([]);
  });
});

describe('digit', () => {
  it('should ...', () => {
    expect(digit('1')).toEqual(['1', '']);
    expect(digit('123')).toEqual(['1', '23']);
    expect(digit('a')).toEqual([]);
  });
});

describe('some', () => {
  it('should ...', () => {
    expect(some(digit)('123abc')).toEqual(['123', 'abc']);
  });
});

describe('int', () => {
  it('should ...', () => {
    expect(int('123abc')).toEqual([123, 'abc']);
  });
});

describe('seq', () => {
  it('should ...', () => {
    expect(seq(digit, char('+'), digit)('1+1')).toEqual([['1', '+', '1'], '']);
  });
});

describe('choice', () => {
  it('should ...', () => {
    expect(choice(digit, char('-'))('-')).toEqual(['-', '']);
    expect(choice(digit, char('-'))('1-3a')).toEqual(['1', '-3a']);
  });
});
