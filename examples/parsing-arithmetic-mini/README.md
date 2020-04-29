# parsing-arithmetic-mini

A mini (for demo purposes) functional arithmetic expression parser.

## Grammar

```
expr
    term '+' expr
    term
term
    factor '*' term
    factor
factor
    '(' expr ')'
    number
```

### With abstracted sequences (operations)

```
expr
    addition
    term
term
    multiplication
    factor
factor
    bracketedExpr
    number
addition
    term '+' expr
multiplication
    factor '*' term
bracketedExpr
    '(' expr ')'
```

## Examples

```js
const { expr } = require('.');

expect(expr('2+3*4')).toEqual([14, '']);
```
