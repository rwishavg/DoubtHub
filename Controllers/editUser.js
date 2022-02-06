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
		// console.log(req.body);
		const update = {
			firstName: req.body.firstNam,
			lastName: req.body.lastName,
			username: req.body.username,
			bio: req.body.bio,
		};
		const query = { emailID: req.body.email };
		const A = await User.findOneAndUpdate(query, { $set: update });
		res.send("success");
	} catch (err) {
		res.json(err);
	}
};
