const gamesData = require("../data/games.json");
module.exports.gamesGetAll = function(req, res) {
    console.log("Get all games");
    res.status(200).json(gamesData);
};
module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const theGame = gamesData[gameId];
    console.log("GET game with gameId " + gameId);
    res.status(200).json(theGame);
};