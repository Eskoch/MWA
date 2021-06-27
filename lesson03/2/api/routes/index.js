const express = require("express");
const router = express.Router();

//games
const controllerGames = require("../controllers/games.controllers");
router.route("/games").get(controllerGames.gamesGetAll)
                       .post(controllerGames.gamesAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
                               .put(controllerGames.gamesFullUpdateOne)
                               .patch(controllerGames.gamesPartialUpdate)
                               .delete(controllerGames.gamesDeleteOne);

//reviews
const controllerReviews = require('../controllers/reviews.controller');
router.route('/games/:gameId/reviews').get(controllerReviews.reviewGetAll)
                                        .post(controllerReviews.reviewAdd)
                                        .delete(controllerReviews.reviewDelete);
router.route('/games/:gameId/reviews/:reviewId').get(controllerReviews.reviewGetOne)
                                                .delete(controllerReviews.reviewDeleteOne)
                                                .put(controllerReviews.reviewUpdateOne);

//publishers
const controllerPublishers = require('../controllers/publishers.controller');
router.route('/games/:gameId/publishers').get(controllerPublishers.publishersGetAll)
                                            .post(controllerPublishers.publisherAdd)
                                            .delete(controllerPublishers.publisherDelete);
router.route('/games/:gameId/publishers/:publisherId').get(controllerPublishers.publishersGetOne)
                                                        .put(controllerPublishers.publisherUpdate);

module.exports = router;
