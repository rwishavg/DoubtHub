const express = require("express");
const router = express.Router();
const { drop } = require("../Controllers/godmode");

router.route("/drop").delete(drop);
module.exports = router;
