/* eslint comma-dangle: 0, no-restricted-properties: 0 */
const R = require('ramda');
const fs = require('fs');
const path = require('path');

// Word-list from http://norvig.com/ngrams
const file = fs.readFileSync(path.join(__dirname, 'words-by-freq.txt'), 'utf8');

const parse = R.compose(
  R.constructN(1, Map),
  R.map(R.split('\t')),
  R.split('\n')
);

const freqs = parse(file);
const total = R.compose(
  R.sum,
  R.init,
  Array.from
)(freqs.values());

const getSplits = text => R.compose(
  R.tail,
  R.addIndex(R.map)(R.flip(R.splitAt))
)(R.repeat(text, text.length + 1));

const probability = segm => (
  segm.length < 2
  ? 0
  : (freqs.get(segm) || 2) / (total * Math.pow(10, segm.length))
);

const score = R.compose(
  R.reduce(R.multiply, 1),
  R.map(probability)
);

const segment = R.memoize(R.compose(
  R.reduce(R.maxBy(score), ['']),
  R.map(split => R.concat(R.of(split[0]), split[1].length ? segment(split[1]) : [])),
  getSplits
));

module.exports = segment;
