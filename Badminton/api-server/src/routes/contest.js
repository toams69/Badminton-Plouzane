module.exports = function(router, schemas) {

  var mongoose      = require('mongoose'),
      _    = require('underscore'),
      timestamps    = require('mongoose-timestamp');

  var Games = schemas.games;
  var Clubs = schemas.clubs;

  var contestSchema = mongoose.Schema({
    _team1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' },
    _team2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' },
    date: { type: Date, default: Date.now },
    resultatTeam1: Number,
    resultatTeam2: Number
  });
  contestSchema.index({ _team1Id: 1, _team2Id: 1, date: 1 }, { unique: true });
  var Contests = mongoose.model('contests', contestSchema);
  schemas.contests = Contests;

  router.get('/contests/?', function(req, res) {
    var opts = [
      { path: '_team1Id', model: 'teams' }
      , { path: '_team2Id', model: 'teams'}
    ];
    Contests
      .find({})
      .sort({
        date: 1
      })
      .populate(opts)
      .exec(function(err, contests) {
        //{ path: '_players', model: 'players'  { path: '_clubId', model: 'clubs'}
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve contests'
          });
        }
        var opts = [
             { path: 'club', model: 'clubs' }
             , { path: 'players', model: 'players'}
          ];
         Clubs.populate(contests, opts, function (error, contests) {
          res.json(contests);
          });
      });
  });

  router.post('/contests/', function(req, res) {
     var body = req.body;
     var Games = schemas.games;
     var contest = new Contests({
      _team1Id: body.team1Id,
      _team2Id: body.team2Id,
      date: body.date
    });
    contest.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      }
      if (!body.games || !body.games.length) {
        res.json({contest: contest});
      }
      var games = [], total = body.games.length, scoreTeam1 = 0, scoreTeam2 = 0;
     _.each(body.games, function(g) {
         var setP1 = 0;
         var game = new Games({
          _contestId: contest.id,
          _player1Id: g.player1,
          _player2Id: g.player2,
          _player3Id: g.player3,
          _player4Id: g.player4,
          date: body.date,
          score11: g.score11,
          score12: g.score12,
          score21: g.score21,
          score22: g.score22,
          score31: g.score31,
          score32: g.score32
        });
        if (parseInt(g.score11) > parseInt(g.score12)) {
          setP1++;
        }
        if (parseInt(g.score21) > parseInt(g.score22)) {
          setP1++;
        }
        if (parseInt(g.score31) > parseInt(g.score32)) {
          setP1++;
        }
        if (setP1 > 1) {
          scoreTeam1++;
        } else {
          scoreTeam2++;
        }
        game.save(function(err, saved){
          if (err) throw err;//handle error
          games.push(saved);
          if (!--total) {
            contest.resultatTeam1 = scoreTeam1;
            contest.resultatTeam2 = scoreTeam2;
            contest.save(function(err) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  error: err
                });
              }
              contest.games = games;
              res.json({
                contest: contest
              });
           });
          }
        });
     });
    });
  });

  router.post('/contests/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Contests.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         var Games = mongoose.model('Games');
         Games.remove({ _contestId: id }, function(err) {
           if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
           }
           res.json({statusCode: 0});
         });
      });
    } else if (body.operation === "update") {
      Contests.findById(id, function(err, contest) {
        if (err)
          res.send(err);
        contest._team1Id= body.team1Id;
        contest._team2Id= body.team2Id;
        contest.date= body.date;
        contest.resultatTeam1= body.resultatTeam1;
        contest.resultatTeam2= body.resultatTeam2
        contest.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "contest": contest});
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
