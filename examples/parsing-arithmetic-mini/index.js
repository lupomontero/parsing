const { char, some, seq, choice } = require('../..');
const { number } = require('../parsing-numbers');

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

const factor = choice(bracketedExpr, number);
const term = choice(multiplication, factor);
const expr = choice(addition, term);

module.exports = { expr, term, factor };
