const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => ({
    mode: argv.mode || 'development',
    devtool: argv.mode === 'development' ? 'inline-source-map' : false,
    entry: {
        background: './src/scripts/background',
        content: './src/scripts/content',
        initialContent: './src/scripts/initialContent',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/index.js',
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimize: argv.mode !== 'development',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' },
                { from: 'src/popup/build', to: 'popup' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/style.css',
        }),
    ],
});
