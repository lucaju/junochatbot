const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackBar = require('webpackbar');

module.exports = {
  mode: 'none', // all mode defaults for dev and prod and set in the respective configs
  entry: {
    app: [path.resolve(__dirname, 'src', 'index.js')],
  },
  output: {
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/', to: './assets' }],
    }),
    // new WebpackBar({ color: '#0099ff' }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: { version: 3, proposals: true },
                    helpers: true, //false
                    regenerator: true,
                    useESModules: true,
                    version: '^7.12.15',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }, // you can specify a publicPath here by default it uses publicPath in webpackOptions.output
          },
          'css-loader',
          'style-loader',
        ],
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
  },
};
