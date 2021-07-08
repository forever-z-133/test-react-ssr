const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const isSSR = process.env.TARGET === 'ssr ';

module.exports = {
  webpack: config => {
    config.output.publicPath = './';
    if (isSSR) {
      config.target = 'node'; // 导出 node 环境代码
      config.entry = path.resolve(__dirname, 'src/server.js');
      config.output.filename = 'bundle-server.js'; // output 不分包命名
      delete config.optimization.splitChunks;
      delete config.optimization.runtimeChunk;
      const rules = config.module.rules[1].oneOf; // 加入 @babel/preset-react
      rules.forEach(rule => {
        if (!rule.loader || !rule.loader.includes('babel-loader')) return;
        rule.options.presets.push('@babel/preset-react');
      });
      if (!config.externals) config.externals = []; // 规避不必要的 node_modules 导出
      config.externals.push(webpackNodeExternals());
      const excludes = ['HtmlWebpackPlugin', 'InlineChunkHtmlPlugin', 'InterpolateHtmlPlugin', 'ManifestPlugin']; // 去除不必要的 plugins
      config.plugins = config.plugins.filter(plugin => !excludes.includes(plugin.constructor.name));
    }
    return config;
  },
};