const express = require('express');
const controllerGames = require('../controllers/games.controllers.js');
const router = express.Router();
router.route("/games").get(controllerGames.gamesGetAll);
module.exports = router;