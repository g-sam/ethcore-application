import path from 'path';

const config = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['latest', 'stage-2'],
      },
    }, {
      test: /\/node_modules\/three\/examples\/js\/renderers\/CSS3DRenderer\.js$/,
      loader: 'imports?THREE=three!exports?CSS3DRenderer=THREE.CSS3DRenderer,CSS3DObject=THREE.CSS3DObject',
    }, {
      test: /\/node_modules\/three\/src\/math\/Cylindrical\.js$/,
      loader: 'babel-loader',
    }],
  },
  devServer: {
    proxy: {
      '*': {
        target: 'http://localhost:4000',
        secure: false,
      },
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      assets: false,
      chunks: false,
    },
  },
};

export default config;
