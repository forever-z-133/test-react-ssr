const path = require("path");

module.exports = {
  target: "node",
  entry: {
    Home: "./src/client/components/Home.js",
    UserList: "./src/client/components/UserList.js",
  },
  output: {
    filename: "[name].js",
    // webpack 5
    // library: {
    //   name: "[name]",
    //   type: 'umd',
    // },
    // webpack 4
    library: "[name]",
    libraryExport: "default",
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "public/routes"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
