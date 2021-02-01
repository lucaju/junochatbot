import chalk from 'chalk';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack.dev.mjs';

export const devTools = (app) => {
  // webpack middleware and hot reload
  config.entry.app.unshift(
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=1000'
  ); // Auto-reloading when webpack detects any changes
  config.plugins.push(new webpack.HotModuleReplacementPlugin()); // Add HMR plugin
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      writeToDisk: true,
      stats: { colors: true },
    })
  );
  // Enable "webpack-hot-middleware"
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
  console.log(chalk.blue('Dev Server is online!'));
};
