const { nothing, char, seq, choice } = require('../..');

const ws = choice(
  seq(() => [char(' '), ws]),
  seq(() => [char('\t'), ws]),
  seq(() => [char('\n'), ws]),
  seq(() => [char('\r'), ws]),
  nothing,
);

module.exports = { ws };
