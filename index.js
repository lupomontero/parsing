//
// Functional arithmetic parser
//
// Main grammar
//
// expr: term + expr | term
// term: factor * term | factor
// factor: (expr) | int
//
// With abstracted sequences (operations)
//
// sum: term + expr
// multiplication: factor * term
// bracketedExpr: (expr)
//
// expr: sum | term
// term: multiplication | factor
// factor: bracketedExpr | int
//

const { char, int, seq, choice } = require('./lib/util');

const bracketedExpr = (str) => {
  const [result, remaining] = seq(char('('), expr, char(')'))(str);
  return !result ? [] : [result[1], remaining];
};

const multiplication = (str) => {
  const [result, remaining] = seq(factor, char('*'), term)(str);
  return !result ? [] : [result[0] * result[2], remaining];
};

const sum = (str) => {
  const [result, remaining] = seq(term, char('+'), expr)(str);
  return !result ? [] : [result[0] + result[2], remaining];
};

const factor = choice(bracketedExpr, int);
const term = choice(multiplication, factor);
const expr = choice(sum, term);

module.exports = { expr, term, factor };
