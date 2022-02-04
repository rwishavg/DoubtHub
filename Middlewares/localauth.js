const passport = require("passport");
const crypto = require('crypto');
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/newUser");


dotenv.config({
	path: "./utils/config.env",
});

passport.use(new LocalStrategy(function verify(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
}));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (Username, done) {
	User.findOne({
		username: Username,
	}).then((user) => done(null, user));
});
