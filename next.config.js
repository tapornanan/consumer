/** @type {import('next').NextConfig} */

let merge = require('webpack-merge');

const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { dev, webpack, isServer }) => {
    const { ModuleFederationPlugin } = webpack.container

    config.experiments = { topLevelAwait: true };

     // we attach next internals to share scope at runtime
    config.module.rules.push({
      test: /pages\/_app.[jt]sx?/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    if (isServer) {
      Object.assign(config.resolve.alias, {
        host: false,
      })
    } else {
      config.plugins.push(
        new ModuleFederationPlugin({
          remotes: {
            host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js'
          },
          shared: {
            react: {
              // Notice shared ARE eager here.
              eager: true,
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      )
    }

    return merge.merge(config, {
      entry() {
        return config.entry().then(entry => {
          return entry;
        });
      },
    });
  }
}

module.exports = nextConfig
