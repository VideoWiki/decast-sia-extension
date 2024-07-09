const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack');
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    popup: "./assets/js/popup.js",
    background: "./assets/js/background.js",
    contentScript: "./assets/js/contentScript.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "icons/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'assets'),
    },
    extensions: [".js", ".vue"],
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "stream": require.resolve("stream-browserify"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
