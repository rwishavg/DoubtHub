const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");
const questionSchema = new Schema({
	questionID: {
		type: String,
		default: nanoid(15),
		required: false,
	},
	username: {
		type: String,
		default: "Name",
		required: false,
	},
	timestamp: {
		type: Timestamp,
		required: true,
		unique: true,
	},
	heading: {
		type: String,
		required: true,
		default: "No",
	},
	description: {
		type: String,
		default: "Say Something About Yourself...",
		required: true,
	},
	likes: {
		type: Integer,
		unique: false,
		default: 0,
	},
});
module.exports = mongoose.model("question", questionSchema, "questionSchema");
/*
	{
		username: "raghav";
		currentState: true;
	}
*/
