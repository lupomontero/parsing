const { char, int, seq, choice } = require('../..');

const bracketedExpr = seq(
  () => [char('('), expr, char(')')],
  ([_, x]) => x,
);

const multiplication = seq(
  () => [factor, char('*'), term],
  ([x, _, y]) => x * y,
);

const addition = seq(
  () => [term, char('+'), expr],
  ([x, _, y]) => x + y,
);

const factor = choice(bracketedExpr, int);
const term = choice(multiplication, factor);
const expr = choice(addition, term);

module.exports = { expr, term, factor };
