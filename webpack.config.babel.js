const path = require('path');
const webpack = require('webpack');

const wpconfig = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ]
};

module.exports = wpconfig;
