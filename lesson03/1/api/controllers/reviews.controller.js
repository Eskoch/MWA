const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports.reviewGetAll = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select('reviews').exec(function(err, reviews) {
        console.log('Found reviews ' + reviews);
        res.status(200).json(reviews);
    });
}

module.exports.reviewGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).find('reviews').select('reviewId').exec(function(err, review) {
        res.status(200).json(review)
    });
}