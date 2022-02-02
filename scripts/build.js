const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

/* client */

build({
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  platform: 'browser',
  outfile: 'dist/client.js',
  plugins: [nodeExternalsPlugin()],
});

/* server */
build({
  entryPoints: ['src/node/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/node.js',
  plugins: [nodeExternalsPlugin()],
});

build({
  entryPoints: ['src/node/cli.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/cli.js',
  plugins: [nodeExternalsPlugin()],
});

/* packages */

build({
  entryPoints: ['packages/create-nsvr/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'packages/create-nsvr/index.js',
  plugins: [nodeExternalsPlugin()],
});
