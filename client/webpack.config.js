var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(__dirname, '../priv/static/js');
var entry = APP_DIR + '/app/index.js';

var config = {
  entry: [entry],
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
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
        include: APP_DIR + '/app/',
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
};

module.exports = config;
