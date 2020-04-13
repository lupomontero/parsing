const char = c => str => (
  str.length && str[0] === c
    ? [str[0], str.slice(1)]
    : []
);

const digit = str => (
  '0123456789'.includes(str[0])
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
        ? [memo, remaining]
        : recurse(`${memo}${result[0]}`, result[1])
    );
  };
  return recurse('', str);
};

const nat = (str) => {
  const [result, remaining] = some(digit)(str);
  return !result ? [] : [parseInt(result, 10), remaining];
};

const seq = (getParsers, reducer) => (str) => {
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

  const [result, remaining] = recurse(getParsers(), [[], str]);
  return !result ? [] : [reducer(result), remaining];
};

const choice = (...parsers) => (str) => {
  if (!parsers.length) {
    return [];
  }
  const result = parsers[0](str);
  return result.length ? result : choice(...parsers.slice(1))(str);
};

const ws = some(choice(char(''), char(' '), char('\t'), char('\n'), char('\r')));

const int = choice(
  seq(() => [char('-'), nat], ([_, x]) => x * -1),
  nat,
);

module.exports = { char, digit, some, nat, seq, choice, ws, int };
