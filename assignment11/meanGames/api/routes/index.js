const express = require("express");
const router = express.Router();

const controllerGames = require("../controllers/games.controllers");

router.route("/games").get(controllerGames.gamesGetAll)
                       .post(controllerGames.gamesAddOne);
                       
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
                               .put(controllerGames.gamesFullUpdateOne)
                               .patch(controllerGames.gamesPartialUpdate)
                               .delete(controllerGames.gamesDeleteOne);

router.route("/games/search/:key").get(controllerGames.gamesSearchOne);

module.exports = router;
