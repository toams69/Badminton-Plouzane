module.exports = function(router) {
  var mongoose    = require('mongoose');
  var timestamps  = require('mongoose-timestamp');
  var playerSchema = require("../forms/player.form.json");
  var utils = require("../utils/jsonParser");
  //var mongoosify = require("mongoosify");

  var schema = utils.jsonSchemaToMongoose(playerSchema);
  console.log(schema);
  var playerSchema = mongoose.Schema(schema);
  var Players = mongoose.model('players', playerSchema);

  router.get('/players/?', function(req, res) {
    Players
      .find({})
      .sort({
        nom: 1
      })
      .exec(function(err, players) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve players'
          });
        }
        res.json(players);
      });
  });


  router.post('/players/', function(req, res) {
     var body = req.body;
     var player = new Players({
          nom: body.nom,
          prenom: body.prenom,
          date: body.date,
          email: body.email,
          telephone: body.telephone
        });

        player.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
          res.json({
            player: player
          });
        });
  });

  router.post('/players/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Players.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         res.json({statusCode: 0});
        });
    } else if (body.operation === "update") {
      Players.findById(id, function(err, player) {
        if (err)
          res.send(err);
        player.nom= body.player.nom;
        player.prenom= body.player.prenom;
        player.date= body.player.date;
        player.email= body.player.email;
        player.telephone= body.player.telephone;
        player.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "player": player});
        });
      });
    } else {
      return res.status(500).json({
          error: "bad operation"
      });
    }
  });



  /*
  Model.remove({ _id: req.body.id }, function(err) {
  */

}