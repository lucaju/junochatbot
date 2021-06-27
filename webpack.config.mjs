import path from 'path';
import { fileURLToPath } from 'url';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV;

const mode = env === 'development' ? 'development' : 'production';
const watch = false; //env === 'development' ? true : false;
const cache = env === 'development' ? true : false;
const devtool = env === 'development' ? 'inline-source-map' : 'source-map'; //'eval-source-map' (might be faster for dev)
const devServer =
  env === 'development'
    ? {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
      }
    : {};

const entry = {
  app: [path.resolve(__dirname, 'src', 'index.tsx')],
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  pathinfo: env === 'development' ? true : false,
};

const resolve = {
  alias: {
    '@src': path.resolve(__dirname, 'src/'),
  },
  extensions: ['.tsx', '.ts', '.js'],
};

const optimization = {
  emitOnErrors: env === 'development' ? true : false,
  minimize: env === 'development' ? false : true,
  minimizer: env === 'development' ? [] : [new TerserPlugin(), new CssMinimizerPlugin()],
  sideEffects: env === 'development' ? false : true,
  usedExports: env === 'development' ? false : true,
};

const plugins = [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new CopyWebpackPlugin({
    patterns: [{ from: path.resolve(__dirname, 'src', 'assets'), to: 'assets' }],
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html'),
    favicon: path.resolve(__dirname, 'src', 'assets', 'icons', 'favicon-32x32.png'),
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new WebpackBar({ color: env === 'development' ? '#7e57c2' : '#9ccc65' }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
];
const module = {
  rules: [
    {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset',
      generator: {
        filename: 'fonts/[name][ext][query]',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name][ext][query]',
      },
    },
    // {
    //   test: /\.svg$/,
    //   loader: 'svg-inline-loader',
    // },
  ],
};

const performance = { hints: env === 'development' ? false : 'warning' };

const debug = env === 'development' && false;
const stats = debug ? { children: true } : {};

const webpackConfig = {
  cache,
  devServer,
  devtool,
  entry,
  mode,
  module,
  optimization,
  output,
  performance,
  plugins,
  resolve,
  stats,
  watch,
};

export default webpackConfig;
