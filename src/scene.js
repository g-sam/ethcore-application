import { Scene } from 'three';

const scene = new Scene();

export const addToScene = divs3D =>
  divs3D.forEach(plane => scene.add(plane));

export default scene;
