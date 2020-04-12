#! /usr/bin/env node

const { expr } = require('..');

const main = (str) => {
  const [result, remaining] = expr(str);

  if (typeof result !== 'number') {
    console.error('SyntaxError: Unexpected character around position 0');
    process.exit(1);
  }

  if (remaining.length) {
    console.error(`SyntaxError: Unexpected character around position ${str.length - remaining.length}`);
    process.exit(1);
  }

  console.log(result);
  process.exit(0);
};

if (module === require.main) {
  main(process.argv[2]);
}
