# parsing (Functional parsing tools)

## Overview

This repo contains a _toy parsing library_ that provides basic infrastructure
to build functional/combinator parsers, as well as some example _parsers_ (a
[number parser](./examples/number), an
[arithmetic expression parser](examples/arithmetic) and a
[`JSON` parser](examples/json)) that make use of the said library.

:warning: These tools are developed as a learning experience and are not intended for use
in production.

This exercise was originally inspired by
[this video featuring Professor Graham Hutton on the Computerphile YouTube channel](https://www.youtube.com/watch?v=dDtZLm7HIJs).
If you are not familiar with
[Computerphile](https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA)
and its sister channel [Numberphile](https://www.youtube.com/user/numberphile)
go subscribe now, they rock!

## Parser definition

Lets begin with Professor Hutton's proposed parser definition.

In the context of functional parsing, a `Parser`, in its most basic form, will
basically be a function that takes a string of characters as its input and
returns a `Tree` that shows the structure found in the analyzed string. (ie: an
_abstract syntax tree_). Borrowing from _Haskell_ syntax, we could express it
like this:

```hs
type Parser = String -> Tree
```

This is pretty simple: _a function that goes from string to tree_. However, in
order to implement parsers that can be combined together into more _useful_
parsers, we need to account for two more things:

* Passing on the part of the string that remains to be parsed.
* Failure (a way to communicate that parsing failed)

In order to address the first issue we could expand our definition of a `Parser`
function and change its return type to include two things: the `Tree` and a
`String` containing the characters that remain to be parsed.

```hs
type Parser = String -> (Tree, String)
```

The second issue can be accommodated by returning a _list_ of results. This way
we can indicate failure by returning an empty list, whereas a successful parse
would return one or more result (each containing both a value (ie: `Tree`) and
the remaining chars to be parsed).

```hs
type Parser = String -> [(Tree, String)]
```

Finally, Professor Hutton proposes one more refinement to our definition.
Instead of being restricted to producing vaues of type `Tree`, our parser
definition should allow for arbitrary types, so we add a type parameter to
reflect this.

```hs
type Parser a = String -> [(a, String)]
```

## Moving on to JavaScript

Things to bear in mind:

* Not strictly typed
* Not strictly functional
* No `do` notation

### Implementation decisions

* As we have no _tuple_ type in JavaScript we will express the pair `a, String`
  as an array with two elements (`[parsedValue, remainingChars]`).
* Drop the flexibility of being able to provide multiple parse results (for
  ambiguous inputs) and instead return directly the results array
  (`[parsedValue, remainingChars]`), and failure can be expressed by simply
  returning an empry array, with no parsed value nor remaining chars to be
  parsed.

Broadly speaking, we could say that we will settle for something like:

```hs
type Parser = String => (Tree, String)
```

In JavaScript land, our _parsers_ are going to be _functions_ that expect a
single argument (the input string) and return an array.

* If parsing succeeded the returned array will have two elements (the parsed
  value and a string with the characters remaining to be parsed).
* If parsing fails the returned array will be empty.

```js
// Parser
const parser = str => (
  (managedToParseSomethingFromInput)
    ? [parsedValue, remaining]
    : []
);

// When parse succeeds:
parser(str); // => [parsedValue, remaining]

// If parse fails:
parser(str); // => []
```

Together with _parser functions_, we will also be working with a bunch of
_higher-order parsers_, which are basically functions that take _parsers_ as
arguments and or return a _parser function_. We will mostly be using these to
create parsers that need configuration and/or combine other parsers in different
ways (ie: see `some`, `seq` and `choice` below).

```js
// Parser creator / Higher-Order Parser
const createParser = () => str => [parsedValue, remaining];
```

## API

### `nothing(str)`

### `char(c)(str)`

### `range(start, end)(str)`

### `some(parser)(str)`

### `seq(getParsers, reducer)(str)`

### `choice(parser1, parser2, ..., parserN)(str)`

### `ws(str)`

#### Grammar

```
ws
    ""
    '0020' ws
    '000A' ws
    '000D' ws
    '0009' ws
```

## Example parsers

* [Number parser](./examples/number)
* [Arithmetic expression parser](examples/arithmetic)
* [`JSON` parser](examples/json)

## Further reading

* https://en.wikipedia.org/wiki/Parsing
* https://en.wikipedia.org/wiki/Formal_grammar
