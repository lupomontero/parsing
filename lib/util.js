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

const some = fn => (str) => {
  const recurse = (memo, remaining) => {
    if (!remaining) {
      return [memo, remaining];
    }
    const result = fn(remaining);
    if (!result.length) {
      return [memo, remaining];
    }
    return recurse(`${memo}${result[0]}`, result[1]);
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
    if (!result.length) {
      return [];
    }
    return recurse(remainingParsers.slice(1), [[...memo, result[0]], result[1]]);
  };

  const [result, remaining] = recurse(getParsers(), [[], str]);
  return !result ? [] : [reducer(result), remaining];
};

const choice = (...fns) => (str) => {
  if (!fns.length) {
    return [];
  }
  const result = fns[0](str);
  if (result.length) {
    return result;
  }
  return choice(...fns.slice(1))(str);
};

const int = choice(
  seq(() => [char('-'), nat], ([_, x]) => x * -1),
  nat,
);

module.exports = { char, digit, some, nat, int, seq, choice };
