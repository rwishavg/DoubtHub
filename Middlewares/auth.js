const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/newUser");
const { nanoid } = require("nanoid");
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.G_CLIENT_ID,
			clientSecret: process.env.G_CLIENT_SECRET,
			callbackURL: "/user/google/callback",
			passReqToCallback: true,
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOne({
				emailID: profile.email,
			}).then((existingUser) => {
				let flag = 0;
				if (existingUser) {
					console.log("Exists!!");
					if (existingUser.password !== "") {
						flag = 1;
					}
				} else {
					console.log("Does not Exist");
					new User({
						googleID: profile.id,
						firstName: profile.given_name,
						lastName: profile.family_name,
						emailID: profile.email,
						profileIMG: profile._json.picture,
						username: nanoid(10),
					}).save();
					console.log("New User Created");
				}
				if (flag == 1) {
					return done(
						"Error: This Email uses different sign in method",
						true
					);
				} else {
					return done(null, profile);
				}
			});
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
