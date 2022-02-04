const schema = require("../Models/newUser");
const passport = require("passport");
const dotenv = require("dotenv");
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
