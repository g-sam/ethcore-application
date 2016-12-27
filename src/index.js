/* global document window fetch */
import TWEEN from 'tween';
import camera from './camera';
import renderer from './renderer';
import scene, { addToScene } from './scene';
import makeDivs, { addHeadline } from './divs';
import make3DObjects from './objects';
import rotate, { addHoverEvents } from './animations';
import addControls from './controls';

renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

window.addEventListener('resize', onWindowResize, false);

function animate() {
  render();
  TWEEN.update();
  rotate(scene.children);
  window.requestAnimationFrame(animate);
}

window.fetch('/data')
  .then(response => response.json())
  .then(makeDivs)
  .then(addHeadline)
  .then(make3DObjects)
  .then(addHoverEvents)
  .then(addToScene)
  .then(addControls(camera, renderer))
  .then(animate)
  .catch((err) => {
    document.body.style.color = 'white';
    document.body.innerHTML = `Error: ${JSON.stringify(err)}`;
  });
