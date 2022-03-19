const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
	tagName: {
		type: String,
		unique: true,
	},
	questionID: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("Tag", tagSchema);
