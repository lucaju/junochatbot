import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';

export default merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
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
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  performance: { hints: 'warning' },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   // exclude: ['vendor.js'],
    //   // filename: '[name].js.map',
    // }),
  ],
});
