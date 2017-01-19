module.exports = function(router, schemas) {
  var mongoose    = require('mongoose');
  var timestamps  = require('mongoose-timestamp');
  var clubSchema = require("../forms/club.form.json");
  var utils = require("../utils/jsonParser");
  //var mongoosify = require("mongoosify");

  var schema = utils.jsonSchemaToMongoose(clubSchema);
  var clubSchema = mongoose.Schema(schema);
  var Clubs = mongoose.model('clubs', clubSchema);

  schemas.clubs = Clubs;

  router.get('/clubs/', function(req, res) {

    if (req.query.subresources && req.query.subresources === "*") {

      var pipeline = [
        {
          $match: {'saison': 2016}
        },
        {
          $group : {
            _id : { clubId: "$_clubId" ,  saison: "$saison" },
            saison: {$first: "$saison"},
            club: {$first: "$_clubId"},
            players: { $push: "$_playerId" }
          }
        }
      ]
      var Enrollments = schemas.enrollments;
      var Players = schemas.players;
      Enrollments
        .aggregate(pipeline, function(err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Could not retrieve clubs'
            });
          }
          var opts = [
             { path: 'club', model: 'clubs' }
             , { path: 'players', model: 'players'}
          ];
          Enrollments.populate(result, opts, function(err, result) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: 'Could not retrieve clubs'
              });
            }
            //result = result.map(function(o) { o.club.players = o.players; return o.club;})
            res.json(result);
          });

        });

    } else {
      Clubs
        .find({})
        .sort({
          nom: 1
        })
        .exec(function(err, clubs) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Could not retrieve clubs'
            });
          }
          res.json(clubs);
        });
    }

  });


  router.get('/clubs/:id', function(req, res) {
    var id = req.params.id;
    if (req.query.subresources && req.query.subresources === "*") {

      var match = {"_clubId": new mongoose.Types.ObjectId(id)};
      if (req.query.saison) {
        match.saison = req.query.saison;
      }
      var pipeline = [
        {
          $match: match
        },
        {
          $group : {
            _id : { clubId: "$_clubId" ,  saison: "$saison" },
            saison: {$first: "$saison"},
            club: {$first: "$_clubId"},
            players: { $push: "$_playerId" }
          }
        }
      ]
      var Enrollments = schemas.enrollments;
      var Players = schemas.players;
      Enrollments
        .aggregate(pipeline, function(err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Could not retrieve clubs'
            });
          }
          var opts = [
             { path: 'club', model: 'clubs' }
             , { path: 'players', model: 'players'}
          ];
          Enrollments.populate(result, opts, function(err, result) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                error: 'Could not retrieve clubs'
              });
            }
            //result = result.map(function(o) { o.club.players = o.players; return o.club;})
            res.json(result);
          });

        });

    } else {
      var find = {"_id": id};
      if (req.query.saison) {
        find.saison = req.query.saison;
      }
      Clubs
        .find(find)
        .sort({
          nom: 1
        })
        .exec(function(err, clubs) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Could not retrieve clubs'
            });
          }
          res.json(clubs);
        });
    }

  });


  router.post('/clubs/', function(req, res) {
     var body = req.body;
     var club = new Clubs({
          nom: body.nom,
          ville: body.ville,
          responsable: body.responsable,
          email: body.email,
          telephone: body.telephone
        });

        club.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
          res.json({
            club: club
          });
        });
  });

  router.post('/clubs/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Clubs.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         res.json({statusCode: 0});
        });
    } else if (body.operation === "update") {
      Clubs.findById(id, function(err, club) {
        if (err)
          res.send(err);
        club.nom= body.club.nom;
        club.ville= body.club.ville;
        club.responsable= body.club.responsable;
        club.email= body.club.email;
        club.telephone= body.club.telephone;
        club.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "club": club});
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
