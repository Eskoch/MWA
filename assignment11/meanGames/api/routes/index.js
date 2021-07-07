const express = require("express");
const router = express.Router();

//users
const controllerUsers = require("../controllers/users.controller");
router.route("/users").post(controllerUsers.register);                                           
router.route("/users/login").post(controllerUsers.login);

// games
const controllerGames = require("../controllers/games.controllers");

router.route("/games").get(controllerGames.gamesGetAll)
                       .post(controllerGames.gamesAddOne);
                       
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
                               .put(controllerGames.gamesFullUpdateOne)
                               .patch(controllerGames.gamesPartialUpdate)
                               .delete(controllerGames.gamesDeleteOne);

router.route("/games/search/:key").get(controllerGames.gamesSearchOne);

//reviews
const controllerReviews = require('../controllers/reviews.controller');
router.route('/games/:gameId/reviews').get(controllerReviews.reviewGetAll)
                                        .post(controllerReviews.reviewAdd)
                                        .delete(controllerReviews.reviewDelete);
router.route('/games/:gameId/reviews/:reviewId').get(controllerReviews.reviewGetOne)
                                                .delete(controllerReviews.reviewDeleteOne);

//publishers
const controllerPublishers = require('../controllers/publishers.controller');
router.route('/games/:gameId/publishers').get(controllerPublishers.publishersGetAll)
                                            .post(controllerPublishers.publisherAdd)
                                            .delete(controllerPublishers.publisherDelete)
                                            .put(controllerPublishers.publisherUpdate);
router.route('/games/:gameId/publishers/:publisherId').get(controllerPublishers.publishersGetOne)
                                                        .put(controllerPublishers.publisherUpdate);


module.exports = router;
