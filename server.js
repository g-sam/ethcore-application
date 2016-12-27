/* eslint comma-dangle: 0, no-restricted-properties: 0 */
const express = require('express');
const data = require('./data.js');
const split = require('./split.js');

const formatStr = string =>
  split(string)
    .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const reducer = obj =>
  Object.keys(obj).reduce((acc, curr) =>
      Object.assign(acc, {
        // eslint-disable-next-line no-use-before-define
        [formatStr(curr)]: recurseReducer(obj[curr]),
      }), {});

const recurseReducer = (obj) => {
  if (Array.isArray(obj)) return obj.map(formatStr);
  if (typeof obj === 'object') return reducer(obj);
  if (typeof obj === 'string') return formatStr(obj);
  return obj;
};

// console.log(reducer(data));

const server = express();

server.get('/data', (req, res) => {
  res.json(reducer(data));
});

server.use('/', express.static(`${__dirname}/public`));

const listener = server.listen(
  process.env.PORT || 4000,
  () =>
    console.log(`Listening on ${listener.address().address}:${listener.address().port}`)
);
