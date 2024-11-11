const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
  entry: {
    bundle: [path.join(__dirname, '../src/index.js')],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      app: 'src/',
    },
    fallback: { "querystring": require.resolve("querystring-es3") }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
  ],
};
