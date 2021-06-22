import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Merge from 'webpack-merge';
import common from './webpack.common.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Merge.merge(common, {
  mode: 'development',
  cache: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  devtool: 'inline-source-map', //'eval-source-map' (might be faster)
  output: {
    pathinfo: true,
    publicPath: '/',
  },
  optimization: {
    checkWasmTypes: false,
    concatenateModules: false,
    emitOnErrors: true,
    flagIncludedChunks: false,
    minimize: false,
    nodeEnv: 'development',
    removeAvailableModules: false,
    sideEffects: false,
    usedExports: false,
  },
  performance: { hints: false },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
