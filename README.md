# A demonstration of Javascript wizardry for Ethcore

A simple app that retrieves some data from a server and renders it in 3D. The data is also processed on the server to split strings without spaces into words.

## Technologies

- ES6 transpiled by Babel and bundled by Webpack.
- Three.js scene rendered with experimental CSS renderer.
- Word segmentation algorithm inspired by Peter Norvig and implemented with Ramda.
- Simple express server.

## Quickstart

- `npm run dev` will fire up the backend on port 4000, proxied by the webpack dev server on port 8080. It is not necessary to build the project, but the `npm run postinstall` command will do so.

## Todo

Some features of the data recorded in the `data.js` file are ignored by the current implementation:
- Some data is stored under duplicate keys ("oneof") in the exported variable; only the last instance of the repeated key is incorporated.
- Some data is stored as arguments to the `enumerate` function; only the option included in the exported variable is incorporated.

These parts of the data were automatically excluded by the variable assignment in the original file, so it seemed natural to ignore them. They might still be considered part of the data, however, so I aim to incorporate them if I get the time.
