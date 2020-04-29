const { char, some, seq, choice, ws } = require('../..');
const { number } = require('../parsing-numbers');

const nullVal = seq(
  () => [char('n'), char('u'), char('l'), char('l')],
  () => null,
);

const trueVal = seq(
  () => [char('t'), char('r'), char('u'), char('e')],
  () => true,
);

const falseVal = seq(
  () => [char('f'), char('a'), char('l'), char('s'), char('e')],
  () => false,
);

const boolVal = choice(trueVal, falseVal);

const character = choice(
  // seq(char('\\'), escape),
  (str) => {
    const code = str.charCodeAt(0);
    return (
      code < 32 || code > 1114111 || ['"', '\\'].includes(str[0])
        ? []
        : [str[0], str.slice(1)]
    );
  },
);

const characters = some(character);

const string = seq(
  () => [char('"'), characters, char('"')],
  ([_, s]) => s,
);

const element = seq(
  () => [ws, value, ws],
  ([_, v]) => v,
);

const elements = choice(
  seq(() => [element, char(','), elements], ([x, _, y]) => [x, ...y]),
  // NOTE: we match single element as sequence in order to get result as array.
  seq(() => [element], v => v),
);

const array = choice(
  seq(() => [char('['), ws, char(']')], () => []),
  seq(() => [char('['), elements, char(']')], ([_, v]) => v),
);

const object = choice(
  seq(() => [char('{'), ws, char('}')], () => ({})),
  seq(() => [char('{'), members, char('}')], ([_, m]) => m),
);

const members = choice(
  seq(() => [member, char(','), members], ([[k, v], _, o]) => ({ ...o, [k]: v })),
  // NOTE: we match single member as sequence in order to get result as array.
  seq(() => [member], ([[k, v]]) => ({ [k]: v })),
);

const member = seq(
  () => [ws, string, ws, char(':'), element],
  ([_, k, __, ___, v]) => [k, v],
);

const value = choice(nullVal, boolVal, number, string, array, object);

module.exports = {
  json: element,
  element,
  elements,
  array,
  number,
  ws,
  character,
  characters,
  string,
  object,
  members,
  member,
};
