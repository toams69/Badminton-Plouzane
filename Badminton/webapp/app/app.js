var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Compiller
var webpack              = require("webpack");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var Wconfig   = null;
var compiler  = null;

if (process.env.NODE_ENV !== "production") {
  console.log("dev mode");
  Wconfig   = require("./webpack.config.dev");
  compiler  = webpack(Wconfig);
  app.use(webpackDevMiddleware(compiler, {
    compress: true,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  Wconfig   = require("./webpack.config");
  compiler  = webpack(Wconfig);
  console.log("production mode");
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false
    }
  }));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var staticPath = __dirname;
if (process.env.NODE_ENV !== "production") {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(express.static(staticPath));
  app.use('/', express.static(staticPath));
  app.use('/new/*', express.static(staticPath));
  app.use('/validateEmail/*', express.static(staticPath));
} else {
  app.use(express.static(staticPath));
  app.use('/', express.static(staticPath));
  app.use('/new/*', express.static(staticPath));
  app.use('/validateEmail/*', express.static(staticPath));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   console.log(1)
//   res.status(500).send('Uh oh! Something broke!');
// });


// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.dir(err);
  res.status(err.status || 500);
  if(err.status === 500) {
    console.error(err.stack);
    res.json({error: 'Internal Server Error'});
  }
  else if(err.status === 404) {
    res.render('error');    //render error page
  } else {
    res.json({error: err.message})
  }
});

module.exports = app;
