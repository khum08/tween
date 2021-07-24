
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'tween.js',
    libraryTarget: 'umd',
    library: 'Tween',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }
    )],
  },
};
