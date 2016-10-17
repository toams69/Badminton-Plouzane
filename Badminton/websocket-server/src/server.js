var express       = require('express');
var app           = express();
var server        = require('http').Server(app);
var io            = require('socket.io')(server);
var socketioJwt   = require('socketio-jwt');
var mongoose      = require('mongoose');

var env = {
  
};

try {
  mongoose.connect('mongodb://'+process.env.DB_URL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('DB connected!');
  });
} catch (e) {
  console.error('connection DB Failed');
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

io.on('connection', socketioJwt.authorize({
  secret: process.env.JWT_TOKEN,
  timeout: 15000 // 15 seconds to send the authentication message
}))
.on('authenticated', function(socket){
  console.log('connected & authenticated: ' + JSON.stringify(socket.decoded_token));
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { env: env });
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(normalizePort(process.env.PORT));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
