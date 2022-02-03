const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/newUser");

dotenv.config({
	path: "./utils/config.env",
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.G_CLIENT_ID,
			clientSecret: process.env.G_CLIENT_SECRET,
			callbackURL: "/user/google/callback",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOne({
				emailID: profile.email,
			}).then((existingUser) => {
				if (existingUser) {
					console.log("Exists!!");
				} else {
					console.log("Does not Exist");
					new User({
						googleID: profile.id,
						firstName: profile.given_name,
						lastName: profile.family_name,
						emailID: profile.email,
						profileIMG: profile._json.picture,
						username: profile.email,
					}).save();
					console.log("New User Created");
				}
			});
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.email);
});

passport.deserializeUser(function (email, done) {
	User.findOne({
		emailID: email,
	}).then((user) => done(null, user));
});
