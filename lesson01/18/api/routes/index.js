const express = require("express");
const controllerGames = require("../controllers/games.controllers.js");
const router = express.Router();
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games/new").post(controllerGames.gamesAddOne);
module.exports = router;