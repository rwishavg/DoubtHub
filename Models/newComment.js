const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
	createdAt: {
		type: Date,
		unique: true,
	},
	body: {
		type: String,
		default: "Say Something ...",
		required: true,
	},
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});
module.exports = mongoose.model("comment", commentSchema, "commentSchema");
