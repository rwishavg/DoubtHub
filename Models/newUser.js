const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");
const userSchema = new Schema({
	googleID: {
		type: String,
		required: false,
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
	bio: {
		type: String,
		default: "Say Something About Yourself...",
		required: false,
		unique: false,
	},
	profileIMG: {
		type: String,
		required: false,
		unique: false,
		default:
			"https://cms.qz.com/wp-content/uploads/2017/03/twitter_egg_blue.png?quality=75&strip=all&w=900&h=900&crop=1",
	},
	password: {
		type: String,
		required: false,
		unique: false,
		default: "",
	},
	username: {
		type: String,
		required: true,
		unique: true,
		default: nanoid(10),
	},
	saved: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model("User", userSchema, "User");
