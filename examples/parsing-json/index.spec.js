const {
  json,
  element,
  elements,
  array,
  number,
  ws,
  character,
  characters,
  string,
  member,
  members,
  object,
} = require('.');

describe('ws', () => {
  it('should...', () => {
    // console.log(ws(''));
    expect(ws('  abc')).toEqual(['  ', 'abc']);
    expect(ws(' \tabc')).toEqual([' \t', 'abc']);
    expect(ws('\n\n\n  abc')).toEqual(['\n\n\n  ', 'abc']);
  });
});

describe('number', () => {
  it('should ...', () => {
    expect(number('123')).toEqual([123, '']);
    expect(number('123abc')).toEqual([123, 'abc']);
    expect(number('abc')).toEqual([]);
  });
});

describe('character', () => {
  it('should ...', () => {
    expect(character('123')).toEqual(['1', '23']);
    expect(character('\\')).toEqual([]);
    expect(character('"')).toEqual([]);
    expect(character(String.fromCharCode(0))).toEqual([]);
  });
});

describe('characters', () => {
  it('should ...', () => {
    expect(characters('123')).toEqual(['123', '']);
    expect(characters('abc\\')).toEqual(['abc', '\\']);
    expect(characters('\\')).toEqual(['', '\\']);
  });
});

describe('string', () => {
  it('should ...', () => {
    expect(string('"123"')).toEqual(['123', '']);
    expect(string('"abc"\\')).toEqual(['abc', '\\']);
    expect(string('"\\"')).toEqual([]);
  });
});

describe('element', () => {
  it('should ...', () => {
    expect(element('[1]')).toEqual([[1], '']);
    // expect(number('123abc')).toEqual([123, 'abc']);
    // expect(number('abc')).toEqual([]);
  });
});

describe('elements', () => {
  it('should ...', () => {
    expect(elements('1,2,3')).toEqual([[1, 2, 3], '']);
    expect(elements('1')).toEqual([[1], '']);
  });
});

describe('array', () => {
  it('should ...', () => {
    expect(array('[1]')).toEqual([[1], '']);
    expect(array('[1,2,3]')).toEqual([[1,2,3], '']);
    expect(array('[ ]')).toEqual([[], '']);
    expect(array('[ \n  ]')).toEqual([[], '']);
  });
});

describe('member', () => {
  it('should ...', () => {
    expect(member('"foo": "bar"')).toEqual([['foo', 'bar'], '']);
  });
});

describe('members', () => {
  it('should ...', () => {
    expect(members('"foo": "bar"')).toEqual([{ foo: 'bar' }, '']);
    expect(members('"foo": "bar", "baz": true')).toEqual([{ foo: 'bar', baz: true }, '']);
  });
});

describe('object', () => {
  it('should ...', () => {
    expect(object('{}')).toEqual([{}, '']);
    expect(object('{ "foo": "bar" }')).toEqual([{ foo: 'bar' }, '']);
    expect(object(`{
      "foo": "bar",
      "baz": true
    }`)).toEqual([{ foo: 'bar', baz: true }, '']);
  });
});

describe('json', () => {
  it('should ...', () => {
    expect(json('null')).toEqual([null, '']);
    expect(json('true')).toEqual([true, '']);
    expect(json('false')).toEqual([false, '']);
    expect(json('123')).toEqual([123, '']);
    expect(json('[123]')).toEqual([[123], '']);
    expect(json('[true]')).toEqual([[true], '']);
    expect(json('[1,2,false,[null,null,[3]]]')).toMatchSnapshot();
    expect(json('[10,11,true,false,null]')).toMatchSnapshot();
    expect(json('[1, true, ["oh my god!"]]')).toMatchSnapshot();
    expect(json('{ "ok": true }')).toMatchSnapshot();
    expect(json(`{
      "ok": true,
      "nested": {
        "oh": "my",
        "version": 2,
        "tags": [1, 2, 3]
      }
    }`)).toMatchSnapshot();
  });
});
