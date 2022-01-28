const schema = require("../Models/newUser");

exports.addNewPost = async (req, res, next) => {
	const myName = req.body.data;
	try {
		const newData = new schema({
			Name: myName,
		});
		const saveData = await newData.save();
		console.log("success!");
		res.send("success!");
	} catch (err) {
		res.json(err);
	}
};

exports.data = async (req, res, next) => {
	try {
		// console.log(req.user.authenticated)
		res.send(req.user);
	} catch (err) {
		res.json(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		req.logout()
		res.redirect('http://localhost:3000/')
	} catch (err) {
		res.json(err);
	}
};
