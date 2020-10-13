import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import Merge from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Merge.merge(common, {
	mode: 'development',
	cache: true,
	devtool: false,
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
	},
	performance: { hints: false },
	output: {
		pathinfo: true,
		publicPath: '/',
	},
	optimization: {
		checkWasmTypes: false,
		concatenateModules: false,
		flagIncludedChunks: false,
		namedModules: true,
		namedChunks: true,
		minimize: false,
		nodeEnv: 'development',
		noEmitOnErrors: false,
		occurrenceOrder: false,
		removeAvailableModules: false,
		sideEffects: false,
		usedExports: false,
	},
	plugins: [
		new webpack.NamedChunksPlugin(),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		new webpack.EvalSourceMapDevToolPlugin({
			module: true,
			columns: true,
			exclude: [
				/luxon/,
				/react/,
			],
		}),
	],
});
