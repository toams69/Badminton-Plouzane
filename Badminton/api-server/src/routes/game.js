module.exports = function(router, schemas) {

  var mongoose      = require('mongoose'),
      timestamps    = require('mongoose-timestamp');

  var gameSchema = mongoose.Schema({
    _contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'contest' },
    _player1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
    _player2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
    _player3Id: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
    _player4Id: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
    date: { type: Date, default: Date.now },
    score11: Number,
    score12: Number,
    score21: Number,
    score22: Number,
    score31: Number,
    score32: Number
  });
  gameSchema.index({ _contestId: 1, _player1Id: 1, _player2Id: 1 , _player3Id: 1, _player4Id: 1 }, { unique: true });
  var Games = mongoose.model('Games', gameSchema);
  schemas.games = Games;

  router.get('/games/?', function(req, res) {
    Games
      .find({})
      .sort({
        date: 1
      })
      .exec(function(err, games) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve games'
          });
        }
        res.json(games);
      });
  });

  router.post('/games/', function(req, res) {
     var body = req.body;
     var game = new Games({
          _team1Id: body.team1Id,
          _team2Id: body.team2Id,
          date: body.date,
          resultatTeam1: body.resultatTeam1,
          resultatTeam2: body.resultatTeam2
        });

        game.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
          res.json({
            game: game
          });
        });
  });

  router.post('/games/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Games.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         res.json({statusCode: 0});
        });
    } else if (body.operation === "update") {
      Games.findById(id, function(err, game) {
        if (err)
          res.send(err);
        game._team1Id= body.team1Id;
        game._team2Id= body.team2Id;
        game.date= body.date;
        game.resultatTeam1= body.resultatTeam1;
        game.resultatTeam2= body.resultatTeam2
        game.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "game": game});
        });
      });
    } else {
      return res.status(500).json({
          error: "bad operation"
      });
    }
  });


}
