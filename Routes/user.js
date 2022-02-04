const express = require("express");
const passport = require("passport");
const router = express.Router();
const app = express();

const {
	logout,
	data,
	googleCallback,
	googleAuthenticate,
} = require("../Controllers/user");

router.route("/data").get(data);
router.route("/logout").get(logout);
router.route("/auth/google").get(googleAuthenticate)
router.route("/google/callback").get(googleCallback)

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

module.exports = router;
