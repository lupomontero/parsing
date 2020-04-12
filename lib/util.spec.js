const { char, digit, some, nat, seq, choice, int } = require('./util');

describe('char', () => {
  it('should create parser for single chars', () => {
    expect(char('a')('a')).toEqual(['a', '']);
    expect(char('a')('abc')).toEqual(['a', 'bc']);
    expect(char('1')('1')).toEqual(['1', '']);
    expect(char('a')('')).toEqual([]);
    expect(char('a')('123')).toEqual([]);
  });
});

describe('digit', () => {
  it('should parse single digit', () => {
    expect(digit('1')).toEqual(['1', '']);
    expect(digit('123')).toEqual(['1', '23']);
    expect(digit('a')).toEqual([]);
  });
});

describe('some', () => {
  it('should apply given parser as many times as possible', () => {
    expect(some(digit)('123abc')).toEqual(['123', 'abc']);
  });
});

describe('nat', () => {
  it('should parse natural numbers (positive integers)', () => {
    expect(nat('123abc')).toEqual([123, 'abc']);
    expect(nat('-123abc')).toEqual([]);
  });
});

describe('seq', () => {
  it('should create a parser that combines the given parsers in sequence', () => {
    const getParsers = () => [digit, char('+'), digit];
    const reducer = ([x, y, z]) => [x, y, z];
    const parser = seq(getParsers, reducer);
    expect(parser('1+1')).toEqual([['1', '+', '1'], '']);
  });
});

describe('choice', () => {
  it('should apply given parsers in sequence until one yields results', () => {
    expect(choice(digit, char('-'))('-')).toEqual(['-', '']);
    expect(choice(digit, char('-'))('1-3a')).toEqual(['1', '-3a']);
    expect(choice(digit, char('a'))('OMG')).toEqual([]);
  });
});

describe('int', () => {
  it('should parse integers (positive and negtive whole numbers)', () => {
    expect(int('123abc')).toEqual([123, 'abc']);
    expect(int('-123abc')).toEqual([-123, 'abc']);
  });
});
