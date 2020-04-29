# White space parser

Parse _white space_ (as defined in the [JSON grammar](https://www.json.org/json-en.html)).

## Grammar

```
ws
    ""
    '0020' ws
    '000A' ws
    '000D' ws
    '0009' ws
```

## API

### `ws(str)`

```js
ws(''); // => ['', '']
ws('  abc'); // => ['  ', 'abc']
ws(' \tabc'); // => [' \t', 'abc']
ws('\n\n\n  abc'); // => ['\n\n\n  ', 'abc']
```
