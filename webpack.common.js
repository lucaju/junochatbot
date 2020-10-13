const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	mode: 'none', // all mode defaults for dev and prod and set in the respective configs
	entry: { app: ['./src/index.js'] },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		// new webpack.ProgressPlugin(),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			chunks: ['app'],
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: ({ name }) => `${name.replace('/js/', '/css/')}.css`,
			chunkFilename: '[id].css',
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/assets/', to: './assets' }],
		}),
		new WebpackBar({ color: '#0099ff' }),
	],
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)/,
			use: [{
				loader: 'babel-loader',
				options: {
					// sourceType: 'unambiguous',
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: [
						'@babel/plugin-proposal-class-properties',[
							'@babel/plugin-transform-runtime', {
								corejs: 3,
								proposals: true,
								// 'helpers': false,
								useESModules: true,
								version: '^7.11.2',
							},
						],
					]
				}
			}]
		},
		{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: { publicPath: '../', }, // you can specify a publicPath here by default it uses publicPath in webpackOptions.output
				},
				'css-loader',
				'style-loader',
			],
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			enforce: 'pre', // preload the jshint loader
			use: [{
				loader: 'url-loader',
				options: {
					query: { limit: 25000 },
				},
			}],
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/i,
			enforce: 'pre', // preload the jshint loader
			// exclude: /node_modules/, // exclude any and all files in the node_modules folder
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'img',
				},
			},
			{
				loader: 'image-webpack-loader',
				options: { disable: true /* webpack@2.x and newer */ },
			}],
		},
		{
			test: /\.svg$/,
			loader: 'svg-inline-loader',
		},
	]},
};
