const environment = require('./.env-cmdrc.js');

module.exports = {
  apps: [
    {
      name: 'juno',
      script: './server/index.mjs',
      args: '--no-daemon',
      node_args: '--experimental-top-level-await',
      env: environment.production,
    },
  ],
};
