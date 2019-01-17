var webpack = require('webpack');
var path = require('path');
const glob = require('glob');
const devMode = process.env.NODE_ENV !== 'production';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(__dirname, '../priv/static/dist/');
var entry = APP_DIR + '/app/index.js';

var config = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: ['babel-polyfill', entry],
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js",
    publicPath: '/assets/dist/',
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  watchOptions: {
    ignored: /node_modules/
  },

  stats: {
    maxModules: 1,
    modules: false,
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : ExtractCssChunks.loader,
          'css-loader',
          'sass-loader',
        ],
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
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      appMountId: 'app',
      filename: BUILD_DIR + '/main.html',
      inject: false,
      title: 'Teebox',
      mobile: true,
      mata: {
        charset: 'utf-8',
        ['X-UA-Compatible']: 'IE=edge'
      },
      bodyHtmlSnippet: devMode ? '<iframe src="/phoenix/live_reload/frame" style="display:none"></iframe>' : ''
    }),
    new ExtractCssChunks({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      hot: true
    })
  ],
};

if (devMode) {
  console.log('Webpack dev build'); // eslint-disable-line no-console
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '0.0.0.0'
    })
  )
} else {
  console.log('Webpack production build'); // eslint-disable-line no-console
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      sourceMap: false,
      parallel: true,
      extractComments: true,
      uglifyOptions: {
        compress: {
          inline: true
        }
      }
    })
  ];
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new CompressionPlugin()
  );
}

module.exports = config;
