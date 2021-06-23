const gamesData = require("../data/games.json");
module.exports.gamesGetAll = function(req, res) {
    console.log("Get all games");
    console.log(req.query);
    let offset = 0;
    let count = 5;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 5);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    const pageGames = gamesData.slice(offset, offset+count);
    res.status(200).json(pageGames);
};
module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const theGame = gamesData[gameId];
    console.log("GET game with gameId " + gameId);
    res.status(200).json(theGame);
};