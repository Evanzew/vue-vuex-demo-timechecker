'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var os = require('os');
var browser = os.platform().indexOf('win32') >= 0 ? 'chrome' : 'google chrome';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name]
  );
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      self: 'global',
      'process.env': config.dev.env
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new FriendlyErrorsPlugin(),
    new openBrowserPlugin({ url: 'http://localhost:8080', browser: browser }),
    new htmlWebpackPlugin({
      template: '!!raw-loader!index.ejs',
      filename: 'index.ejs',
      alwaysWriteToDisk: true
    }),
    new htmlWebpackHarddiskPlugin(),
    new extractTextPlugin({
      filename: 'assets/css/[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
