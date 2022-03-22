const mongoose = require("mongoose");
const QuestionSchema = require("../Models/newQuestion");
const { Schema } = mongoose;

const tagSchema = new Schema({
	tagName: {
		type: String,
		unique: true,
	},
	questionID: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "question",
			},
		],
		default: [],
	},
});

module.exports = mongoose.model("tag", tagSchema);
