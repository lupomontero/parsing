//
// Functional arithmetic parser
//
// Main grammar
//
// expr: term + expr | term - expr | term
// term: factor * term | factor / term | factor
// factor: (expr) | int
//
// With abstracted sequences (operations)
//
// addition: term + expr
// subtraction: term - expr
// multiplication: factor * term
// division: factor / term
// bracketedExpr: (expr)
//
// expr: addition | subtraction | term
// term: multiplication | division | factor
// factor: bracketedExpr | int
//

const { char, int, seq, choice } = require('./lib/util');

const bracketedExpr = seq(
  () => [char('('), expr, char(')')],
  ([_, x]) => x,
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

const factor = choice(bracketedExpr, int);
const term = choice(multiplication, division, factor);
const expr = choice(addition, subtraction, term);

module.exports = { expr, term, factor };
