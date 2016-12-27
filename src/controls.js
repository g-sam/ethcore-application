import * as THREE from 'three';
import ThreeOrbitControls from 'three-orbit-controls';

const OrbitControls = ThreeOrbitControls(THREE);

const addControls = (camera, renderer) => () => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 1;
  controls.minDistance = 0;
  controls.maxDistance = 20;
};

export default addControls;
