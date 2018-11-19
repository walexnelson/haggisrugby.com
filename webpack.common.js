const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(process.cwd(), 'src/index.js'),
    noscript: path.join(process.cwd(), 'src/noscript.js'),
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[hash].[ext]',
      },

      { test: /\.json$/, loader: 'json-loader' },

      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(process.cwd(), 'site/data'),
      prettyPrint: true,
    }),

    new CopyWebpackPlugin([
      {
        from: './src/fonts/',
        to: 'fonts/',
        flatten: true,
      },
    ]),
  ],
};
