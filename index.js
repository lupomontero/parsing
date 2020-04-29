const nothing = str => ['', str];

const char = c => str => (
  str.length && str[0] === c
    ? [str[0], str.slice(1)]
    : []
);

const range = (start, end) => str => (
  str[0] >= start && str[0] <= end
    ? [str[0], str.slice(1)]
    : []
);

const some = parser => (str) => {
  const recurse = (memo, remaining) => {
    if (!remaining) {
      return [memo, remaining];
    }
    const result = parser(remaining);
    return (
      !result.length
        ? !memo ? [] : [memo, remaining]
        : recurse(`${memo}${result[0]}`, result[1])
    );
  };
  return recurse('', str);
};

const seq = (parsers, reducer = results => results.join('')) => (str) => {
  const recurse = (remainingParsers, [memo, remainingStr]) => {
    if (!remainingParsers.length) {
      return [memo, remainingStr];
    }
    const result = remainingParsers[0](remainingStr);
    return (
      (!result.length)
        ? []
        : recurse(remainingParsers.slice(1), [[...memo, result[0]], result[1]])
    );
  };

  const [result, remaining] = recurse(
    typeof parsers === 'function' ? parsers() : parsers,
    [[], str],
  );
  return !result ? [] : [reducer(result), remaining];
};

const choice = (...parsers) => (str) => {
  if (!parsers.length) {
    return [];
  }
  const result = parsers[0](str);
  return result.length ? result : choice(...parsers.slice(1))(str);
};

module.exports = { nothing, char, range, some, seq, choice };
