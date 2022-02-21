const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
	commentID: {
		type: String,
		unique: true,
		required: false,
	},
	createdAt: {
		type: Date,
		unique: true,
	},
	firstName: {
		type: String,
		required: false,
		default: "No",
	},
	lastName: {
		type: String,
		default: "Name",
		required: false,
	},
	emailID: {
		type: String,
		required: true,
		unique: true,
	},
	body: {
		type: String,
		default: "Say Something ...",
		required: true,
	},
	userIMG: {
		type: String,
		required: false,
		unique: false,
		default:
			"https://cms.qz.com/wp-content/uploads/2017/03/twitter_egg_blue.png?quality=75&strip=all&w=900&h=900&crop=1",
	},
	username: {
		type: String,
		required: true,
		unique: true,
		default: nanoid(10),
	},
});
module.exports = mongoose.model("comment", commentSchema, "commentSchema");
