const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../Models/newUser");
const QuestionSchema = require("../Models/newQuestion");
const { nanoid } = require("nanoid");
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
		res.status(200).send(req.user);
	} catch (err) {
		res.json(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		req.logout();
		res.redirect(host + "/");
	} catch (err) {
		res.json(err);
	}
};

exports.googleAuthenticate = passport.authenticate("google", {
	scope: ["email", "profile"],
	// failWithError: true,
});

exports.googleCallback = passport.authenticate("google", {
	successRedirect: host + "/dashboard",
	failureRedirect: host + "/login",
});

exports.signup = async (req, res, next) => {
	try {
		User.findOne(
			{ emailID: req.body.username },
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
						password: hashedPassword,
						username: nanoid(10),
					}).save();
					res.send("New User Created");
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

exports.getUser = async (req, res, next) => {
	try {
		let userData = await User.findOne({ username: req.body.username });
		let questions = await QuestionSchema.find().populate(
			"userid",
			"username firstName lastName profileIMG emailID"
		);

		const result = questions.filter(
			(question) => question.userid.username === req.body.username
		);
		res.status(200).send({
			firstName: userData.firstName,
			lastName: userData.lastName,
			bio: userData.bio,
			profileIMG: userData.profileIMG,
			questions: result,
		});
	} catch (err) {
		res.json(err);
	}
};
