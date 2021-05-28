const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = path.resolve(process.cwd(), 'dist');

const server = {
    mode: "development",
    entry: path.join(process.cwd(), "src/server/main.ts"),

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
        new RemovePlugin({
            before: {
                include: [
                    path.resolve(buildPath, 'server'),
                ],
            },

            watch: {
                include: [
                    path.resolve(buildPath, 'server'),
                ],
            },
        }),
    ],

    optimization: {
        minimize: true,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    output: {
        filename: 'server.js',
        path: path.resolve(buildPath, 'server'),
    }
};

const client = {
    mode: "development",
    entry: path.join(process.cwd(), "src/client/main.ts"),

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
        new RemovePlugin({
            before: {
                include: [
                    path.resolve(buildPath, 'client'),
                ],
            },

            watch: {
                include: [
                    path.resolve(buildPath, 'client'),
                ],
            },
        }),
    ],

    optimization: {
        minimize: true,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    output: {
        filename: 'client.js',
        path: path.resolve(buildPath, 'client'),
    },
};

const nui = {
    mode: "development",
    entry: path.join(process.cwd(), "src/nui/index.tsx"),

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new RemovePlugin({
            before: {
                include: [
                    path.resolve(buildPath, 'nui'),
                ],
            },
        }),
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), "src/nui/public/index.html"),
            inject: true,
        }),
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    output: {
        filename: 'index.js',
        path: path.resolve(buildPath, 'nui'),
    },
};

module.exports = [server, client, nui];
