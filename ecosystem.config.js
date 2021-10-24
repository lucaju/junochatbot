module.exports = {
  apps: [
    {
      name: 'juno',
      script: 'ts-node ./server/index.ts',
      args: '--no-daemon',
      node_args: '--experimental-top-level-await',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
