const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'production',

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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/"
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
              // publicPath: "../",
              useRelativePaths: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    })
  ]
});
