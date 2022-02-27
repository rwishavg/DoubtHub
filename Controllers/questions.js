const dotenv = require("dotenv");
const { exists } = require("../Models/newQuestion");
const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");
const { nanoid } = require("nanoid");

dotenv.config({
	path: "./utils/config.env",
});

let host = "";
if (process.env.NODE_ENV === "development") {
	host = "http://localhost:3000";
}

exports.addNewQuestion = async (req, res, next) => {
	try {
		let result = await new QuestionSchema({
			userid: req.body.userid,
			heading: req.body.questionHeading,
			description: req.body.description,
			questionID: nanoid(15),
			createdAt: Date.now(),
		}).save();

		console.log(result);
		res.status(200).send(result);
	} catch (err) {
		res.json(err);
	}
};

exports.getQuestions = async (req, res, next) => {
	try {
		let questions = await QuestionSchema.find()
			.populate("userid", "username firstName lastName profileIMG")
			.sort({ createdAt: -1 });

		res.status(200).send(questions);
	} catch (err) {
		res.json(err);
	}
};
exports.getQuestionPage = async (req, res, next) => {
	try {
		let query = { questionID: req.body.id };
		let questions = await QuestionSchema.findOne(query)
			.populate("userid", "username firstName lastName profileIMG")
			.populate(
				"comments.userid",
				"username firstName lastName profileIMG"
			);

		if (questions === null) res.status(200).send({ exists: false });
		else res.status(200).send(questions);
	} catch (err) {
		res.json(err);
	}
};

exports.getSavedQuestions = async (req, res, next) => {
	try {
		let allPromise = [];
		req.body.saved.map((id) => {
			let promise = new Promise(function (resolve, reject) {
				QuestionSchema.findOne({
					_id: id,
				})
					.populate(
						"userid",
						"username firstName lastName profileIMG"
					)
					.exec((err, question) => {
						if (question === null) {
							resolve({
								exists: false,
								_id: id,
								questionID: "",
								userid: {
									_id: "",
									firstName: "",
									lastName: "",
									profileIMG: "",
								},
								createdAt: "",
								heading: "",
								description: "",
								likes: 0,
								__v: 0,
							});
							// console.log(question.exists);
						} else {
							resolve(question);
						}
					});
			});
			allPromise.push(promise);
		});

		Promise.all(allPromise).then((values) => {
			// console.log(values);
			res.send(values);
		});
	} catch (err) {
		res.json(err);
	}
};

exports.deleteQuestion = async (req, res, next) => {
	try {
		await QuestionSchema.deleteOne({ _id: req.body.id });
		res.send("Deleted");
		// console.log(req.body);
	} catch (err) {
		res.json(err);
	}
};

exports.saveQuestion = async (req, res, next) => {
	try {
		const userData = await User.findOne({ emailID: req.body.email });
		var i = userData.saved.indexOf(req.body.id);
		if (i === -1) {
			userData.saved.push(req.body.id);
			userData.save();
			res.send("Added");
		} else {
			userData.saved.splice(i, 1);
			userData.save();
			res.send("Removed");
		}
	} catch (err) {
		res.json(err);
	}
};

exports.myQuestions = async (req, res, next) => {
	try {
		// console.log(req.body.emailID);
		let questions = await QuestionSchema.find().populate(
			"userid",
			"username firstName lastName profileIMG emailID"
		);
		const result = questions.filter(
			(question) => question.userid.emailID === req.body.emailID
		);
		res.send(result);
	} catch (err) {
		res.json(err);
	}
};
