// // const QuestionSchema = require("../Models/newQuestion");
// const Tag = require("../Models/newTag");

// exports.addNewTag = async (req, res, next) => {
// 	try {
// 		console.log(req.body);
// 		let result = await new Tag({
// 			tags: req.body.tags,
// 			questionID: nanoid(15),
// 			createdAt: Date.now(),
// 		}).save();
// 		for (i = 0; i < req.body.tags.length; i++) {
// 			await new Tag({
// 				tagName: req.body.tags[i],
// 				questionID: result.questionID,
// 			}).save();
// 		}
// 		res.status(200).send(result);
// 	} catch (err) {
// 		res.json(err);
// 	}
// };