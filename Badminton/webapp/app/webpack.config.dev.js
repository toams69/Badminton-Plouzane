var path = require('path');
var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: 'cheap-module-eval-source-map',
  // entry: {
  //   app: './public/src/index.js',
  //   vendor: [
  //     'react',
  //     'react-router',
  //     'redux',
  //     'react-dom',
  //     'lodash'
  //   ]
  // },
  entry: [
    path.resolve(__dirname, './src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  resolve: { 
    extensions: ['', '.js', '.jsx'],
    alias:{
      _common: path.resolve( __dirname, '../common/' ),
      webworkify: 'webworkify-webpack',
     'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
   // root: [ path.join(__dirname, 'app') ]
  },
  output: {
    path: path.join(__dirname, '/src'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filname: 'vendor.js'
    // })
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
          },
          {
            test: /\.js$/,
            include: path.join("./node_modules/webworkify/index.js"),
            loader: "worker"
          },
          {
            test: /mapbox-gl.+\.js$/,
            loader: "transform/cacheable?brfs"
          }
      ]
  }
};

module.exports = config;
