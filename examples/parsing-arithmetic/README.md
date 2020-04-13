# parsing-arithmetic

A functional arithmetic expression parser.

## Grammar

```
expr
    term '+' expr
    term '-' expr
    term
term
    factor '*' term
    factor '/' term
    factor
factor
    '(' expr ')'
    int
```

### With abstracted sequences (operations)

```
expr
    addition
    subtraction
    term
term
    multiplication
    division
    factor
factor
    bracketedExpr
    int
addition
    term '+' expr
subtraction
    term '-' expr
multiplication
    factor '*' term
division
    factor '/' term
bracketedExpr
    '(' expr ')'
```

## Examples

```js
const { expr } = require('.');

expect(expr('2+3*4')).toEqual([14, '']);
```
