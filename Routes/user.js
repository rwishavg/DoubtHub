const express = require("express");
const router = express.Router();

const {
	logout,
	data,
	googleCallback,
	googleAuthenticate,
	signup,
	login,
	getUser,
} = require("../Controllers/user");

router.route("/data").get(data);
router.route("/logout").get(logout);
router.route("/signup").post(signup);
router.route("/getUser").post(getUser);

router.route("/google/callback").get(googleCallback);
router.route("/auth/google").get(googleAuthenticate);
router.post("/auth/local", login);

const { editProfile } = require("../Controllers/editUser");

router.route("/profile/edit").post(editProfile);

module.exports = router;
