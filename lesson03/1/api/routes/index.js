const express = require("express");
const router = express.Router();

const controllerGames = require("../controllers/games.controllers.js");
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);

const controllerReviews = require('../controllers/reviews.controller.js');
router.route('/games/:gameId/reviews').get(controllerReviews.reviewGetAll);
router.route('/games/:gameId/reviews/:reviewId').get(controllerReviews.reviewGetOne);

module.exports = router;
