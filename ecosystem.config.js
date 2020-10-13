const environment = require('./.env-cmdrc.js');

module.exports = {
	apps: [
		{
			name: 'chatstories',
			script: './server/index.mjs',
			args: '--no-daemon',
			node_args: '--experimental-top-level-await',
			env: environment.production,
		},
	],
};