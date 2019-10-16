const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    inline: true,
    hot: true
  },

  // watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[path][name].[ext]",
              context: path.resolve(__dirname, "src/image/"),
              outputPath: "dist/image",
              publicPath: "../",
              useRelativePaths: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
