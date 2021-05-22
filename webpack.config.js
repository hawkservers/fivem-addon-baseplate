const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require("remove-files-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildPath = path.resolve(__dirname, 'dist');

const server = {
    entry: './src/server/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "server")],
            },

            watch: {
                include: [path.resolve(buildPath, "server")],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
        filename: '[contenthash].server.js',
        path: path.resolve(buildPath, "server"),
    },
};

const client = {
    entry: './src/client/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "client")],
            },

            watch: {
                include: [path.resolve(buildPath, "client")],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
        filename: '[contenthash].client.js',
        path: path.resolve(buildPath, "client"),
    },
};

const nui = {
    entry: './src/nui/index.tsx',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/nui/public/index.html',
            inject: true,
            minify: true
        }),
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "nui")],
            },

            watch: {
                include: [path.resolve(buildPath, "nui")],
            },
        }),
    ],
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    output: {
        filename: 'index.js',
        path: path.resolve(buildPath, "nui"),
    },
};

module.exports = [server, client, nui];
