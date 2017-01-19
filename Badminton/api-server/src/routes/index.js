var express     = require('express');
var router      = express.Router();


var schemas = {};

require('./club')(router, schemas);
require('./player')(router, schemas);
require('./enrollment')(router, schemas);
require('./team')(router, schemas);
require('./game')(router, schemas);
require('./contest')(router, schemas);

module.exports = router;
