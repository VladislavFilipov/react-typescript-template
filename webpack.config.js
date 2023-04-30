const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const PRODUCTION = "production",
  DEVELOPMENT = "development";

let mode = DEVELOPMENT;
let target = "web";
if (process.env.NODE_ENV === PRODUCTION) {
  mode = PRODUCTION;
  target = "browserslist";
}

module.exports = {
  mode,
  target,
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: [
          mode === DEVELOPMENT ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName:
                  mode === PRODUCTION
                    ? "[hash:base64]"
                    : "[local]_[hash:base64]",
                localIdentHashDigestLength: 7
              }
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.m?[jt]sx?$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource"
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [
      ".ts",
      ".tsx",
      ".scss",
      ".css",
      ".webpack.js",
      ".web.js",
      ".js"
    ]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: mode === DEVELOPMENT ? "[name].css" : "[name].[contenthash].css"
    })
  ],
  devServer: {
    static: "./dist"
  },
  optimization: {
    nodeEnv: DEVELOPMENT
  }
};
