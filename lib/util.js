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

const int = (str) => {
  const [result, remaining] = some(digit)(str);
  return !result ? [] : [parseInt(result, 10), remaining];
};

const seq = (...fns) => (str) => {
  const recurse = (remainingFns, [memo, remainingStr]) => {
    if (!remainingFns.length) {
      return [memo, remainingStr];
    }
    const result = remainingFns[0](remainingStr);
    if (!result.length) {
      return [];
    }
    return recurse(remainingFns.slice(1), [[...memo, result[0]], result[1]]);
  };
  return recurse(fns, [[], str]);
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

module.exports = { char, digit, some, int, seq, choice };
