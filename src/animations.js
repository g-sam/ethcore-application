import { Vector3 } from 'three';
import { Cylindrical } from 'three/src/math/Cylindrical';
import TWEEN from 'tween';

const vector = new Vector3();
const cylindrical = new Cylindrical();

const initialZoom = 800;
const finalZoom = 650;
let tweenCurrentZoom = { z: initialZoom };

let DTheta = 0;

const zoomIn = (plane, theta) => () => {
  tweenCurrentZoom.uuid = plane.uuid;
  TWEEN.removeAll();
  new TWEEN.Tween(tweenCurrentZoom)
    .to({ z: finalZoom }, 500)
    .easing(TWEEN.Easing.Back.Out)
    .onUpdate(function () {
      tweenCurrentZoom = this;
      cylindrical.set(this.z, theta, 0);
      plane.position.setFromCylindrical(cylindrical);
    })
    .start();
};

const zoomOut = (plane, theta) => () => {
  tweenCurrentZoom.uuid = plane.uuid;
  TWEEN.removeAll();
  new TWEEN.Tween(tweenCurrentZoom)
    .to({ z: initialZoom }, 500)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function () {
      tweenCurrentZoom = this;
      cylindrical.set(this.z, theta, 0);
      plane.position.setFromCylindrical(cylindrical);
    })
    .start();
};

const setPosition = (plane, idx, planes) => {
  const theta = (idx * ((2 * Math.PI) / planes.length)) + DTheta;
  DTheta += 0.0001;
  const zoom = plane.uuid === tweenCurrentZoom.uuid
    ? tweenCurrentZoom.z
    : initialZoom;
  cylindrical.set(zoom, theta, 0);
  plane.position.setFromCylindrical(cylindrical);
  vector.x = plane.position.x / 2;
  vector.y = plane.position.y;
  vector.z = plane.position.z / 2;
  plane.lookAt(vector);
};

export const addHoverEvents = planes =>
  planes.map((plane, idx) => {
    // theta will be overwritten by rotate
    const theta = idx * ((2 * Math.PI) / planes.length);
    plane.element.addEventListener('mouseenter', zoomIn(plane, theta));
    plane.element.addEventListener('mouseleave', zoomOut(plane, theta));
    return plane;
  });

export default planes =>
  planes.forEach(setPosition);
