const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development', 
  devtool: 'inline-source-map',
  entry: {
    popup: './assets/js/popup.js',
    background:'./assets/js/background.js',
    contentScript: './assets/js/contentScript.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test:/\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['file-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
