const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../Models/newUser");
const bcrypt = require("bcrypt");
dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

exports.data = async (req, res, next) => {
	try {
		// console.log(req.user);
		res.send(req.user);
	} catch (err) {
		res.json(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		req.logout();
		res.redirect(host + "/");
		console.log("logged out");
	} catch (err) {
		res.json(err);
	}
};

exports.googleAuthenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
	failWithError: true,
});

exports.googleCallback = passport.authenticate("google", {
	successRedirect: host + "/dashboard",
	failureRedirect: "/login",
});

exports.signup = async (req, res, next) => {
	try {
		User.findOne(
			{ username: req.body.username },
			async function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(
						req.body.password,
						salt
					);
					new User({
						emailID: req.body.username,
						username: req.body.username,
						password: hashedPassword,
					}).save();
					console.log("new user created!");
					res.send("User Created");
				} else {
					res.send("User Already Exists");
				}
			}
		);
	} catch (err) {
		res.json(err);
	}
};

exports.login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send(false);
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send(true);
			});
		}
	})(req, res, next);
};
