/* global document */
import { CSS3DObject } from 'three/examples/js/renderers/CSS3DRenderer';

const createPlane = divList => (planes, key) => {
  const div = divList[key];
  const plane = new CSS3DObject(div);
  return [
    ...planes,
    plane,
  ];
};

export default divs =>
  Object.keys(divs).reduce(createPlane(divs), []);
