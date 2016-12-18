var JwtStrategy = require('passport-jwt').Strategy;
var config = require('../../config');

// load up the user model
var User = require('./User');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
      console.log(user)
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
