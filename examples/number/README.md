# Number parser

An example functional number parser based on JSON's number grammar.

## Grammar

This example implements JSON's _number_ grammar.

In this grammar, a _number_ is made up of 3 parts: _integer_, _fraction_ and
_exponent_. The last two are optional (they can be _nothing_). Consider the
following number:

```
-3.14e+2
```

Number _parts_:

```
   -3       .14       e+2
\_______/\________/\_______/
 integer  fraction  exponent
```

### Formal grammar

```
number
    integer fraction exponent

integer
    digit
    onenine digits
    '-' digit
    '-' onenine digits

digits
    digit
    digit digits

digit
    '0'
    onenine

onenine
    '1' . '9'

fraction
    ""
    '.' digits

exponent
    ""
    'E' sign digits
    'e' sign digits

sign
    ""
    '+'
    '-'
```

## API

### `number(str)`

### `integer(str)`

### `digits(str)`

### `digit(str)`

### `onenine(str)`

### `fraction(str)`

### `exponent(str)`

### `sign(str)`

## Examples

```js
const { number } = require('.');

expect(number('2abc')).toEqual([2, 'abc']);
```
