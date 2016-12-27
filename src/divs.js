/* global document */
const getDivs = (data, makeDivs, seed) =>
  Object.keys(data).reduce(makeDivs(data), seed);

const makeNestedDiv = depth => data => (div, key) => {
  // eslint-disable-next-line no-use-before-define
  div.appendChild(createDiv(data, key, depth + 1));
  return div;
};

const getClass = (depth, type) =>
`level-${depth} ${type}`;

const createDiv = (data, key, depth) => {
  const div = document.createElement('div');
  if (typeof data[key] === 'object') {
    const h = document.createElement('div');
    h.className = 'title';
    h.textContent = key;
    div.appendChild(h);
    div.className = getClass(depth, 'container');
    return getDivs(data[key], makeNestedDiv(depth), div);
  }
  div.className = getClass(depth, 'root');
  if (Number.isNaN(Number(key))) {
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = `${key}: `;
    div.appendChild(label);
  }
  const content = document.createElement('span');
  content.className = `content ${typeof data[key]}`;
  content.textContent = data[key];
  div.appendChild(content);
  return div;
};

const makeDivs = data => (divs, key) => ({
  ...divs,
  [key]: createDiv(data, key, 0),
});

export const addHeadline = (divList) => {
  const newDivList = Object.assign({}, divList);
  const headline = newDivList.Headline;
  headline.textContent = `${headline.textContent.slice(10)} >> drag to view`;
  headline.className = 'headline';
  document.body.appendChild(headline);
  delete newDivList.Headline;
  return newDivList;
};

export default requestData =>
  getDivs(requestData, makeDivs, {});
