const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../Models/newUser");
dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

exports.editProfile = async (req, res, next) => {
	try {
		const update = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			bio: req.body.bio,
		};
		const query = { emailID: req.body.email };
		const result = await User.findOneAndUpdate(query, update, {
			new: true,
		});
		res.send(result);
	} catch (err) {
		res.json(err);
	}
};
