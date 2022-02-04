const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/newUser");

dotenv.config({
	path: "./utils/config.env",
});

passport.use(new LocalStrategy(
  function(Username, password, done) {
    User.findOne({ username: Username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'User not found!' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, {   
          message: 'Invalid password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (Username, done) {
	User.findOne({
		username: Username,
	}).then((user) => done(null, user));
});
