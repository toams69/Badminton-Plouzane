module.exports = function(router, schemas) {
  var mongoose      = require('mongoose'),
      timestamps    = require('mongoose-timestamp');

  var teamSchema = mongoose.Schema({
    nom: String,
    type: String,
    _players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'players' }],
    _clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' },
    saison: Number
  });
  teamSchema.index({ nom: 1, _clubId: 1, saison: 1, type: 1 }, { unique: true });
  var Teams = mongoose.model('teams', teamSchema);

  schemas.teams = Teams;

  router.get('/teams/?', function(req, res) {
     var opts = [
        { path: '_players', model: 'players' }
        , { path: '_clubId', model: 'clubs'}
      ];




    Teams
      .find({})
      .sort({
        saison: 1
      })
      .populate(opts)
      .exec(function(err, teams) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve teams'
          });
        }
        res.json(teams);
      });
  });

  router.post('/teams/', function(req, res) {
     var body = req.body;
     var team = new Teams({
          nom: body.nom,
          type: body.type,
          _clubId: body._clubId,
          saison: body.saison,
          _players: body._players
        });

        team.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
          res.json({
            team: team
          });
        });
  });

  router.post('/teams/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Teams.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         res.json({statusCode: 0});
        });
    } else if (body.operation === "update" && body.team) {
      Teams.findById(id, function(err, team) {
        if (err)
          res.send(err);
        if (body.team.nom)
        team.nom= body.team.nom;
        if (body.team._players)
          team._players= body.team._players;
        if (body.team._clubId)
          team._clubId= body.team._clubId;
        if (body.team.saison)
          team.saison= body.team.saison;
        if (body.team.type)
          team.type = body.team.type;
        team.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "team": team});
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
