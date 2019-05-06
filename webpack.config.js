"use strict";

var path = import("path");

module.exports = {
  mode: "development",
  name: "Vertical Web Components General Setup",
  env: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
