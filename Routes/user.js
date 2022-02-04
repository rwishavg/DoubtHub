const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
	logout,
	data,
	googleCallback,
	googleAuthenticate,
	signup,
	login,
} = require("../Controllers/user");

router.route("/data").get(data);
router.route("/logout").get(logout);
router.route("/auth/google").get(googleAuthenticate);
router.route("/google/callback").get(googleCallback);

router.route("/signup").post(signup);
router.post("/auth/local", login);

module.exports = router;
