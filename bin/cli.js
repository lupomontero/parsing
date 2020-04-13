#! /usr/bin/env node

const { expr } = require('../examples/parsing-arithmetic');
const { json } = require('../examples/parsing-json');

const readInputFromStdin = () => new Promise((resolve, reject) => {
  const chunks = [];

  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      chunks.push(chunk.trim());
    }
  });

  process.stdin.on('end', () => resolve(chunks.join()));
});

class ParserError extends SyntaxError {
  constructor(input, remaining) {
    const pos = (
      remaining && remaining.length
        ? input.length - remaining.length
        : 0
    );
    super(`Unexpected character around position ${pos}`);
    this.input = input;
    this.pos = pos;
  }
  toString() {
    const inputArr = [...this.input];
    return `${this.constructor.name}: ${this.message}

${this.input}
${inputArr.reduce(
  (memo, char, idx) => (idx === this.pos ? `${memo}^` : `${memo} `),
  '',
)}`;
  }
}

const main = async (parserName, str) => {
  if (!['arithmetic', 'json'].includes(parserName)) {
    throw new Error(`Unknown parser: ${parserName}`);
  }

  const input = str || await readInputFromStdin();
  const [result, remaining] = parserName === 'json' ? json(input) : expr(input);

  if (typeof remaining !== 'string') {
    throw new ParserError(input);
  }

  if (remaining.length) {
    throw new ParserError(input, remaining);
  }

  return result;
};

if (module === require.main) {
  main(process.argv[2], process.argv[3])
    .then(result => console.dir(result, { depth: null }))
    .catch((err) => {
      console.error(`${err}`);
      process.exit(1);
    });
}
