# A demonstration of Javascript wizardry for Ethcore

A simple app that retrieves some data from a server and renders it in 3D. The data is also processed on the server to split strings without spaces into words.

## Technologies

- ES6 transpiled by Babel and bundled by Webpack.
- Three.js scene rendered with experimental CSS renderer.
- Word segmentation algorithm inspired by Peter Norvig and implemented with Ramda.
- Simple express server.

## Quickstart

- `npm run dev` will fire up the backend on port 4000, proxied by the webpack dev server on port 8080. It is not necessary to build the project, but the `npm run postinstall` command will do so.
