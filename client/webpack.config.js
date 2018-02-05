var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(__dirname, '../priv/static/js');
var entry = APP_DIR + '/app/index.js';
const devBuild = process.env.NODE_ENV !== 'production';

var config = {
  entry: ['babel-polyfill', entry],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },

  watchOptions: {
    ignored: /node_modules/
  },

  stats: {
    maxModules: 1,
    modules: false,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: path.resolve(__dirname, "app"),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=10000'
      }
    ],
  },
  plugins: [],
};

if (devBuild) {
  console.log('Webpack dev build'); // eslint-disable-line no-console
  module.exports.devtool = 'eval';
} else {
  module.exports.devtool = 'cheap-module-eval-source-map';
  config.plugins.push(
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyPlugin()
  );
  console.log('Webpack production build'); // eslint-disable-line no-console
}

module.exports = config;
