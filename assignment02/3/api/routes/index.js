const express = require("express");
const multiplier = require("./controllers/calculator.multiply.js");
const router = express.Router();
router.route("/multiply/:val").get(multiplier.multiply);
module.exports = router;