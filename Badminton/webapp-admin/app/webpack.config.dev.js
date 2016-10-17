var path = require('path');
var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, './src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  resolve: { 
    extensions: ['', '.js', '.jsx'],
    alias:{
       _containers: path.resolve( __dirname, './src/containers/' ),
       _actions: path.resolve( __dirname, './src/actions/' ),
       _components:  path.resolve( __dirname, './src/components/' ),
       _forms:  path.resolve( __dirname, './src/forms/' )
    }
  },
  output: {
    path: path.join(__dirname, '/src'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
          {
              test: /\.js$/,
              loader: "babel",
              query: {
                presets: [ "es2015", "react", "react-hmre", "stage-1" ]
              },
              exclude: /node_modules/,
          },
          {
            test: /\.json/,
            loader: "json"
          }
      ]
  }
};

module.exports = config;
