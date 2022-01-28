const express = require("express");
const router = express.Router();

const { addNewPost, logout } = require("../Controllers/user");

router.route("/add-new-post").post(addNewPost);
router.route("/logout").get(logout);

module.exports = router;
