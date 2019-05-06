const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/app.ts'),
    devtool: 'inline-source-map',
    output: {
        filename: 'app.js',
        path: __dirname + 'dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new TSLintPlugin({
            files: ['./src/**w/*.ts'],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
