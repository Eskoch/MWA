const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports.gamesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 5;
    let maxCount = 8;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Game.find().skip(offset).limit(count).exec(function (err, games) {
        console.log('Found Games ' + games.length);
        res.status(200).json(games);
    });
};
module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findById(gameId).exec(function(err, game) {
        res.status(200).json(game);
    });
};