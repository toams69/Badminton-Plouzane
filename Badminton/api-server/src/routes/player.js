module.exports = function(router, schemas) {
  var mongoose    = require('mongoose');
  var timestamps  = require('mongoose-timestamp');
  var playerSchema = require("../forms/player.form.json");
  var utils = require("../utils/jsonParser");
  //var mongoosify = require("mongoosify");

  var _  = require('underscore');
  var schema = utils.jsonSchemaToMongoose(playerSchema);
  console.log(schema);
  var playerSchema = mongoose.Schema(schema);
  var Players = mongoose.model('players', playerSchema);

  schemas.players = Players;

  router.get('/players/?', function(req, res) {
    Players
      .find({})
      .sort({
        prenom: 1,
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

  router.get('/players/:playerId', function(req, res) {
    var playerId = req.params.playerId;

    Players.findById(playerId, function(err, player) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Could not find player'
        });
      }
      var Games = mongoose.model('Games');
      var Teams = mongoose.model('teams');
      console.log("Searching games for player "+ playerId);
      var opts = [
        { path: '_contestId', model: 'contests' },
        { path: '_player1Id', model: 'players' },
        { path: '_player2Id', model: 'players' },
        { path: '_player3Id', model: 'players' },
        { path: '_player4Id', model: 'players'}
      ];
       Games
        .find({ $or: [{_player1Id: playerId}, {_player2Id: playerId}, {_player3Id: playerId}, {_player4Id: playerId}] })
        .populate(opts)
        .sort({
          date: -1
        })
        .exec(function(err, games) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Could not retrieve games of this player'
            });
          }
          var opts = [
            { path: '_team1Id', model: 'teams'},
            { path: '_team2Id', model: 'teams' }
          ];
          Teams.populate(games, opts, function (error, games) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: 'Could not retrieve games of this player'
              });
            }
            var obj = player.toObject();
            obj.games = games;
            res.json(obj);
          });
        });
      });
  });

  router.post('/players/', function(req, res) {
     var body = req.body;
     var player = new Players({
          nom: body.nom,
          prenom: body.prenom,
          sexe: body.sexe,
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
        player.sexe= body.player.sexe,
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
