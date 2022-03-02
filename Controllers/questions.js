const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");
const Comment = require("../Models/newComment");
const { nanoid } = require("nanoid");

exports.addNewQuestion = async (req, res, next) => {
	try {
		let result = await new QuestionSchema({
			userid: req.body.userid,
			heading: req.body.questionHeading,
			description: req.body.description,
			questionID: nanoid(15),
			createdAt: Date.now(),
		}).save();
		res.status(200).send(result);
	} catch (err) {
		console.log(err);
		res.json(err);
	}
};

exports.getQuestions = async (req, res, next) => {
	try {
		let questions = await QuestionSchema.find()
			.populate("userid", "username firstName lastName profileIMG")
			.populate("comments", "body createdAt userid")
			.populate({
				path: "comments",
				populate: {
					path: "userid",
					select: "username firstName lastName profileIMG",
				},
			})
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
			.populate("comments", "body createdAt userid")
			.populate({
				path: "comments",
				populate: {
					path: "userid",
					select: "username firstName lastName profileIMG",
				},
			});

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
						} else {
							resolve(question);
						}
					});
			});
			allPromise.push(promise);
		});

		Promise.all(allPromise).then((values) => {
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

exports.likeQuestion = async (req, res, next) => {
	try {
		const questionData = await QuestionSchema.findOne({
			_id: req.body.questionID,
		});
		var i = questionData.likes.indexOf(req.body.userID);
		if (i === -1) {
			questionData.likes.push(req.body.userID);
			questionData.save();
			res.status(200).send({
				message: "Liked",
				count: questionData.likes.length,
			});
		} else {
			questionData.likes.splice(i, 1);
			questionData.save();
			res.status(200).send({
				message: "Unliked",
				count: questionData.likes.length,
			});
		}
	} catch (err) {
		res.json(err);
	}
};

exports.myQuestions = async (req, res, next) => {
	try {
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
