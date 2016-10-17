var path = require('path');
var webpack = require('webpack');
var path = require('path');

var config = {
  entry: {
    app: [
      path.resolve(__dirname, './src/index.js')
    ],
    vendor: [
      'react',
      'react-router',
      'redux',
      'react-dom',
      'lodash'
    ]
  },
  // entry: [
  //   path.resolve(__dirname, './src/index.js'),
  // ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias:{
      _containers: path.resolve( __dirname, '/src/containers/' ),
    }
   // root: [ path.join(__dirname, 'app') ]
  },
  output: {
    path: __dirname,
    filename: "[name].min.js",
    publicPath : '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
          comments: false
      },
      compress:{
        warnings: true,
        'unused'    : true,
        'dead_code' : true
      }
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filname: 'vendor.js'
    // })
  ],
  module: {
     preLoaders: [{ 
      test: /\.json$/, 
      loader: 'json'
    }],
    loaders: [
          {
              test: /\.js$/,
              loader: "babel",
              query: {
                presets: [ "es2015", "react", "stage-1" ]
              },
              exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
            loader: 'worker'
          },
          {
            test: /mapbox-gl.+\.js$/,
            loader: 'transform/cacheable?brfs'
          }
      ]
  },
   node: {
    fs: 'empty'
  }
};

module.exports = config;
