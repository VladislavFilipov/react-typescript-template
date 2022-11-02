const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode,
  target,
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?[jt]sx?$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        // loader: 'file-loader',
        // options: {
        //     name: '[name].[ext]',
        // },
      },
      // {
      //     test: /\.(woff2?|eot|ttf|otf)$/i,
      //     type: 'asset/resource',
      // },
      // {
      //     test: /\.tsx?$/,
      //     exclude: "/node_modules",
      //     use: "ts-loader"
      // }
    ],
  },
  resolve: {
    extensions: [
      ".scss",
      ".css",
      ".webpack.js",
      ".web.js",
      ".ts",
      ".tsx",
      ".js",
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    static: "./dist",
  },
  optimization: {
    nodeEnv: "development",
  },
};
