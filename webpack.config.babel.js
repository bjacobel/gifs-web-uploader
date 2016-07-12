const path = require('path');
const webpack = require('webpack');

const wpconfig = {
  entry: {
    bookmarklet: [
      './src/bookmarklet.js'
    ],
    uploader: [
      './src/uploader.js'
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
    ],
    noParse: [
      /aws\-sdk/
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = wpconfig;
