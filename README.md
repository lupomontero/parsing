# parsing

* Inspired on https://www.youtube.com/watch?v=dDtZLm7HIJs.
* https://en.wikipedia.org/wiki/Parsing
* https://en.wikipedia.org/wiki/Formal_grammar

## Overview

```hs
type Parser = String -> Tree
```

```hs
type Parser = String -> (Tree, String)
```

```hs
type Parser = String -> [(Tree, String)]
```

```hs
type Parser a = String -> [(a, String)]
```

```js
// Parser
Array parser(str: String)

// Pareser creator
Function createParser()
```

```js
parser(str); // => [resultSoFar, remaining]
parser(str); // => []
```

***

## Arithmetic expression parser

### Grammar

* `expr`: `term` `+` `expr` | `term` `-` `expr` | `term`
* `term`: `factor` `*` `term` | `factor` `/` `term` | `factor`
* `factor`: `(expr)` | `int`

## Examples

```js
const { expr } = require('.');

expect(expr('2+3*4')).toEqual([14, '']);
```
