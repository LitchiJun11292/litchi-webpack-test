const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyPlugin = require("./plugins/MyPlugin");
const FileListPlugin = require("./plugins/FileListPlugin");

module.exports = {
  mode: "production",
  // entry: "./src/index.js",
  entry: {
    pageA: "./src/index.js",
    pageB: "./src/index.js",
    // polyfills: require.resolve("./polyfills"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [["@babel/preset-env", { targets: "defaults" }]],
        //       plugins: ["@babel/plugin-transform-arrow-functions"],
        //     },
        //   },
        //   {
        //     loader: path.resolve(__dirname, "loaders/test-loader.js"),
        //     options: {
        //       allow: true,
        //     },
        //   },
        // ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        // use: ["style-loader", "css-loader", "sass-loader"],
        use: ["css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.html$/,
      //   use: ["html-loader", "html-minify-loader"], // 处理顺序 html-minify-loader(压缩html) => html-loader => webpack
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "pageA.html",
      title: "pageA",
      chunks: ["pageA"],
      hash: true,
      minify: {
        removeAttributeQuotes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "pageB.html",
      title: "pageB",
      chunks: ["pageB"],
      hash: true,
      minify: {
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin(),
    // new MyPlugin(),
    // new FileListPlugin({
    //   filename: "_filelist.md",
    // }),
  ],
};
