// webpack.settings.js - webpack settings config
var path = require('path');

module.exports = {
    mode:"development",
    name:"Vertical Web Components General Setup",
    env: "development",
    entry:'./src/index.js',
    output: {
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd"
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
