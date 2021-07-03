module.exports = {
  apps: [
    {
      name: 'juno',
      script: 'ts-node ./server/index.tjs',
      args: '--no-daemon',
      node_args: '--experimental-top-level-await',
      env: {
        NODE_ENV: 'production',
      }
    },
  ],
};
