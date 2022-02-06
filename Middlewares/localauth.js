const passport = require("passport");
const crypto = require("crypto");
const User = require("../Models/newUser");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config({
	path: "./utils/config.env",
});

passport.use(
	new LocalStrategy((email, password, done) => {
		User.findOne({ emailID: email }, (err, user) => {
			if (err) throw err;
			if (!user) return done(null, false);
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) throw err;
				if (result === true) {
					console.log("Right Pass");
					return done(null, user);
				} else {
					console.log("Wrong Pass");
					return done(null, false);
				}
			});
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.emailID);
});

passport.deserializeUser(function (Username, done) {
	User.findOne({
		emailID: Username,
	}).then((user) => done(null, user));
});
