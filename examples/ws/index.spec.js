const { ws } = require('.');

describe('ws', () => {
  it('should...', () => {
    expect(ws('')).toEqual(['', '']);
    expect(ws('  abc')).toEqual(['  ', 'abc']);
    expect(ws(' \tabc')).toEqual([' \t', 'abc']);
    expect(ws('\t\rabc')).toEqual(['\t\r', 'abc']);
    expect(ws('\n\n\n  abc')).toEqual(['\n\n\n  ', 'abc']);
  });
});
