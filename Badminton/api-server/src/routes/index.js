var express     = require('express');
var router      = express.Router();

require('./club')(router);
require('./player')(router);

module.exports = router;