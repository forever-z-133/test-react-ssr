const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  entry: "./src/server.js",
  output: {
    filename: "bundle-server.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
    ],
  },
  externals: [webpackNodeExternals()],
};