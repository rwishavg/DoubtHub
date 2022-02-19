const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
const User = require("../Models/newUser");

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

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
					}).save();
					console.log("New User Created");
				}
				if (flag == 1) {
					return done("Error: Email does not exist", true);
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
