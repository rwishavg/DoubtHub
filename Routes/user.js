const express = require("express");
const passport = require("passport");
const router = express.Router();
const app = express();

const {
	logout,
	data,
	googleCallback,
	googleAuthenticate,
	signup
} = require("../Controllers/user");

router.route("/data").get(data);
router.route("/logout").get(logout);
router.route("/auth/google").get(googleAuthenticate);
router.route("/google/callback").get(googleCallback);

router.route("/signup").post(signup);

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

router.post('/auth/local', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

module.exports = router;
