const {
  nothing,
  char,
  range,
  some,
  seq,
  choice,
  ws,
} = require('.');

describe('nothing', () => {
  it('should ...', () => {
    expect(nothing('abc')).toEqual(['', 'abc']);
  });
});

describe('char', () => {
  it('should create parser for single chars', () => {
    expect(char('a')('a')).toEqual(['a', '']);
    expect(char('a')('abc')).toEqual(['a', 'bc']);
    expect(char('1')('1')).toEqual(['1', '']);
    expect(char('a')('')).toEqual([]);
    expect(char('a')('123')).toEqual([]);
  });
});

describe('range', () => {
  it('should parse char in given range', () => {
    expect(range('0', '9')('abc')).toEqual([]);
    expect(range('0', '9')('123')).toEqual(['1', '23']);
  });
});

describe('some', () => {
  it('should apply given parser as many times as possible', () => {
    expect(some(char('0'))('000abc')).toEqual(['000', 'abc']);
    expect(some(range('0', '9'))('123abc')).toEqual(['123', 'abc']);
  });
});

describe('seq', () => {
  it('should create a parser that combines the given parsers in sequence', () => {
    const getParsers = () => [char('1'), char('+'), char('1')];
    const reducer = ([x, y, z]) => [x, y, z];
    const parser = seq(getParsers, reducer);
    expect(parser('1+1')).toEqual([['1', '+', '1'], '']);
  });
});

describe('choice', () => {
  it('should apply given parsers in sequence until one yields results', () => {
    expect(choice(char('0'), char('-'))('-')).toEqual(['-', '']);
    expect(choice(nothing, char('-'))('1-3a')).toEqual(['', '1-3a']);
    expect(choice(char('a'), char('b'))('OMG')).toEqual([]);
  });
});

describe('ws', () => {
  it('should...', () => {
    expect(ws('')).toEqual(['', '']);
    expect(ws('  abc')).toEqual(['  ', 'abc']);
    expect(ws(' \tabc')).toEqual([' \t', 'abc']);
    expect(ws('\n\n\n  abc')).toEqual(['\n\n\n  ', 'abc']);
  });
});
