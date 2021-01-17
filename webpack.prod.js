const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: false,
  performance: { hints: 'warning' },
  output: { pathinfo: false },
  optimization: {
    checkWasmTypes: true,
    concatenateModules: true,
    emitOnErrors: false,
    flagIncludedChunks: true,
    nodeEnv: 'production',
    sideEffects: true,
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'js/app.js.map',
      module: true,
      columns: true,
      noSources: false,
      namespace: '',
      exclude: [/luxon/, /react/],
    }),
  ],
});
