var express     = require('express');
var router      = express.Router();

require('./club')(router);

module.exports = router;