const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './js/main.js',
    output: {
        filename: 'js/[name].bundle.js',
        assetModuleFilename: 'css/[name][ext][query]',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: './index.html', to: 'index.html' },
                { from: './css/normalize.css', to: 'normalize.css' },
                { from: './assets', to: 'assets' },
                { from: './js/services/itemServices/products.json', to: 'products.json' },
                { from: './js/libraries/gsap.min.js', to: 'gsap.min.js' },
                { from: './js/libraries/jspdf.min.js', to: 'jspdf.min.js' },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    },
};
