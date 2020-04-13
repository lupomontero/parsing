const { char, int, ws, seq, choice } = require('../..');

const bracketedExpr = seq(
  () => [ws, char('('), expr, char(')'), ws],
  ([_, __, x]) => x,
);

const multiplication = seq(
  () => [factor, char('*'), term],
  ([x, _, y]) => x * y,
);

const division = seq(
  () => [factor, char('/'), term],
  ([x, _, y]) => x / y,
);

const addition = seq(
  () => [term, char('+'), expr],
  ([x, _, y]) => x + y,
);

const subtraction = seq(
  () => [term, char('-'), expr],
  ([x, _, y]) => x - y,
);

const wsPaddedInt = seq(
  () => [ws, int, ws],
  ([_, n]) => n,
);

const factor = choice(bracketedExpr, wsPaddedInt);
const term = choice(multiplication, division, factor);
const expr = choice(addition, subtraction, term);

module.exports = { expr, term, factor };
