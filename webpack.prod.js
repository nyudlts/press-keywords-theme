const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config')

module.exports = merge.merge(common, {
  mode: 'production',
  devtool: 'source-map'
});
