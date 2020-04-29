# Arithmetic expression parser

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
    ws '(' expr ')' ws
    ws number ws
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
    wsPaddedInt
addition
    term '+' expr
subtraction
    term '-' expr
multiplication
    factor '*' term
division
    factor '/' term
bracketedExpr
    ws '(' expr ')' ws
wsPaddedInt
    ws number ws
```

## Examples

```js
const { expr } = require('.');

expect(expr('2+3*4')).toEqual([14, '']);
```
