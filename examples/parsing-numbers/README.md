# parsing-numbers

An example functional number parser based on JSON's number grammar.

## Grammar

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
