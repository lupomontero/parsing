const { nothing, char, range, some, seq, choice } = require('../..');

const onenine = range('1', '9');

const digit = choice(char('0'), onenine);

// const digits = choice(
//   seq(() => [digit, digits]),
//   digit,
// );

const digits = some(digit);

const sign = choice(char('+'), char('-'), nothing);

const integer = choice(
  seq(() => [onenine, digits]),
  digit,
  seq(() => [char('-'), onenine, digits]),
  seq(() => [char('-'), digit]),
);

const fraction = choice(
  seq(() => [char('.'), digits]),
  nothing,
);

const exponent = choice(
  seq(() => [char('E'), sign, digits]),
  seq(() => [char('e'), sign, digits]),
  nothing,
);

const number = seq(
  () => [integer, fraction, exponent],
  ([x, y, z]) => parseFloat(`${x}${y}${z}`, 10),
);

module.exports = {
  onenine,
  digit,
  digits,
  sign,
  integer,
  fraction,
  exponent,
  number,
};
