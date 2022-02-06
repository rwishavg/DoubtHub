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
		console.log(req.body);
		console.log(User);
		const update = {
			firstName: req.body.firstNam,
			lastName: req.body.lastName,
			username: req.body.username,
			bio: req.body.bio,
		};
		const query = { emailID: req.body.emailID };
		const A = await User.findOneAndUpdate(query, { $set: update },{upsert: true}, { new: true }, function(err,doc) {
			if (err) { throw err; }
			else { console.log("Updated"); }
		});
		console.log(A.firstName);
	} catch (err) {
		res.json(err);
	}
};
