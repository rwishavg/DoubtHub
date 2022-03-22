const QuestionSchema = require("../Models/newQuestion");
const User = require("../Models/newUser");
const Tag = require("../Models/newTag");
const { nanoid } = require("nanoid");

exports.addNewQuestion = async (req, res, next) => {
	try {
		let result = await new QuestionSchema({
			userid: req.body.userid,
			heading: req.body.questionHeading,
			description: req.body.description,
			tags: req.body.tags,
			questionID: nanoid(15),
			createdAt: Date.now(),
		}).save();

		for (i = 0; i < req.body.tags.length; i++) {

			let currTag = await Tag.findOne(
				{ tagName: req.body.tags[i] }
			);

			if (currTag === null) {
				await new Tag({
					tagName: req.body.tags[i],
					questionID: result._id,
				}).save();
			}
			else {
				currTag.questionID.push(result._id);
				currTag.save();
			}
		}
		res.status(200).send(result);
	} catch (err) {
		console.log(err)
		res.json(err);
	}
};

exports.getQuestions = async (req, res, next) => {
	try {
		let skip = (parseInt(req.params.pages) - 1) * 10;
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
			.limit(10)
			.skip(skip)
			.sort({ createdAt: -1 });
		res.status(200).send(questions);
	} catch (err) {
		res.json(err);
	}
};

exports.getQuestionPages = async (req, res, next) => {
	try {
		let query = { questionID: req.params.id };
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
		let query = { _id: req.params.id };
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

		if (questions === null)
			res.status(200).send({
				exists: false,
				_id: req.params.id,
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
				comments: [],
				likes: 0,
				__v: 0,
			});
		else res.status(200).send(questions);
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

exports.banQuestion = async (req, res, next) => {
	try {
		let query = { _id: req.body.questionId };
		let question = await QuestionSchema.findOne(query);
		var i = question.ban.indexOf(req.body.userId);
		if (i === -1) {
			question.ban.push(req.body.userId);
			question.save();
			if (question.ban.length > 2) {
				const update = {
					heading: "Question is Unavailable",
					description:
						"This question was reported by 3 different users and has been removed for being inappropriate",
				};
				await QuestionSchema.findOneAndUpdate(
					query,
					{ $set: update },
					{ new: true }
				);
			}
			res.send("Reported");
		} else res.send("Already Reported. Cannot report again!");
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

exports.updateQuestion = async (req, res, next) => {
	try {
		const update = {
			heading: req.body.heading,
			body: req.body.body,
			createdAt: Date.now(),
		};
		const query = { questionID: req.body.questionID };
		const result = await QuestionSchema.findOneAndUpdate(query, update, {
			new: true,
		});
		res.send(result);
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
			(question) =>
				JSON.stringify(question.userid._id) ===
				JSON.stringify(req.params.id)
		);
		res.send(result);
	} catch (err) {
		res.json(err);
	}
};
