/* global window */
import { CSS3DRenderer } from 'three/examples/js/renderers/CSS3DRenderer';

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

export default renderer;
