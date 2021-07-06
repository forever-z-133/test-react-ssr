const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const isSSR = process.env.TARGET === 'ssr ';

module.exports = {
  webpack: config => {
    config.output.publicPath = './';
    if (isSSR) {
      config.target = 'node';
      config.entry = path.resolve(__dirname, 'server/index.js');
      config.output.filename = 'bundle-server.js';
      delete config.optimization.splitChunks; // output 不分包
      delete config.optimization.runtimeChunk;
      if (!config.externals) config.externals = [];
      const rules = config.module.rules[1].oneOf;
      rules.forEach(rule => {
        if (!rule.loader || !rule.loader.includes('babel-loader')) return;
        rule.options.presets.push('@babel/preset-react');
      });
      config.externals.push(webpackNodeExternals());
      const excludes = ['HtmlWebpackPlugin', 'InlineChunkHtmlPlugin', 'InterpolateHtmlPlugin', 'ManifestPlugin'];
      config.plugins = config.plugins.filter(plugin => !excludes.includes(plugin.constructor.name));
    }
    return config;
  },
};