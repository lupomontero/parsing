const {
  onenine,
  digit,
  digits,
  sign,
  integer,
  fraction,
  exponent,
  number,
} = require('.');

describe('onenine', () => {
  it('should parse range 1 - 9', () => {
    expect(onenine('10')).toEqual(['1', '0']);
    expect(onenine('123')).toEqual(['1', '23']);
    expect(onenine('a')).toEqual([]);
  });
});

describe('digit', () => {
  it('should parse single digit', () => {
    expect(digit('1')).toEqual(['1', '']);
    expect(digit('123')).toEqual(['1', '23']);
    expect(digit('a')).toEqual([]);
  });
});

describe('digits', () => {
  it('should parse multiple digits', () => {
    expect(digits('1')).toEqual(['1', '']);
    expect(digits('123')).toEqual(['123', '']);
    expect(digits('a')).toEqual([]);
  });
});

describe('sign', () => {
  it('should parse "+", "-" or nothing', () => {
    expect(sign('')).toEqual(['', '']);
    expect(sign('+123')).toEqual(['+', '123']);
    expect(sign('-a')).toEqual(['-', 'a']);
  });
});

describe('integer', () => {
  it('should parse integers (positive and negtive whole numbers)', () => {
    expect(integer('1abc')).toEqual(['1', 'abc']);
    expect(integer('123abc')).toEqual(['123', 'abc']);
    expect(integer('-123abc')).toEqual(['-123', 'abc']);
  });
});

describe('fraction', () => {
  it('should "optionally" parse fraction part', () => {
    expect(fraction('.1')).toEqual(['.1', '']);
    expect(fraction('.123abc')).toEqual(['.123', 'abc']);
  });
});

describe('exponent', () => {
  it('should "optionally" parse exponent part', () => {
    expect(exponent('E+1')).toEqual(['E+1', '']);
    expect(exponent('e-123abc')).toEqual(['e-123', 'abc']);
    expect(exponent('.123abc')).toEqual(['', '.123abc']);
  });
});

describe('number', () => {
  const testData = [
    ['5', [5, '']],
    ['-11', [-11, '']],
    ['3.14', [3.14, '']],
    ['-3.14e+2', [-314, '']],
    ['3.14e-3', [0.00314, '']],
  ];

  testData.forEach(([input, expected]) => {
    it(`should return ${expected} for input "${input}"`, () => {
      expect(number(input)).toEqual(expected);
    });
  });
});
