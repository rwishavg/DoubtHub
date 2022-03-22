const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
	tagName: {
		type: String,
		unique: true,
	},
	questionID: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
	}
});

module.exports = mongoose.model("Tag", tagSchema, "Tags");
