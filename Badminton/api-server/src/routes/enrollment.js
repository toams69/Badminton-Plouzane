module.exports = function(router, schemas) {

  var mongoose      = require('mongoose'),
      timestamps    = require('mongoose-timestamp');

  var Clubs = schemas.clubs;
  var Players = schemas.players;

  var enrollmentSchema = mongoose.Schema({
    _playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'players' },
    _clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' },
    saison: Number
  });
  enrollmentSchema.index({ _playerId: 1, _clubId: 1, saison: 1 }, { unique: true });
  var Enrollments = mongoose.model('enrollments', enrollmentSchema);

  schemas.enrollments = Enrollments;

  router.get('/enrollments/?', function(req, res) {
    Enrollments
      .find({})
      .sort({
        saison: 1
      })
      .exec(function(err, enrollments) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve enrollments'
          });
        }
        res.json(enrollments);
      });
  });


  router.post('/enrollments/', function(req, res) {
     var body = req.body;
     var enrollment = new Enrollments({
          _playerId: body.playerId,
          _clubId: body.clubId,
          saison: body.saison
        });

        enrollment.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
          res.json({
            enrollment: enrollment
          });
        });
  });

  router.post('/enrollments/:id', function(req, res) {
     var body = req.body;
     var id = req.params.id;
     if (body.operation === "delete") {
       Enrollments.remove({ _id: id }, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
         }
         res.json({statusCode: 0});
        });
    } else if (body.operation === "update") {
      Enrollments.findById(id, function(err, enrollment) {
        if (err)
          res.send(err);
        enrollment._playerId= body.playerId;
        enrollment._clubId= body.clubId;
        enrollment.saison= body.saison;
        enrollment.save(function(err) {
          if (err)
           res.send(err);
          res.json({statusCode: 0, "enrollment": enrollment});
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
