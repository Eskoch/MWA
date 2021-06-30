const mongoose = require('mongoose');
const Game = mongoose.model('Game');

// GET
module.exports.reviewGetAll = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select('reviews').exec(function(err, reviews) {
        console.log('Found reviews ' + reviews);
        res.status(200).json(reviews);
    });
};

module.exports.reviewGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select('reviews').exec(function(err, games) {
        const review = games.reviews.id(reviewId);
        res.status(200).json(review)
    });
}

// Insert new review
const _addReview = function(req, res, game) {
    console.log(req.body);
    game.reviews.push({
        name : req.body.name,
        rating : req.body.rating,
        review : req.body.review,
        createdOn : req.body.createdOn
    });
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewAdd = function(req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId); 
    Game.findById(gameId).exec(function(err, game) {
        console.log("the game " + game);
        _addReview(req, res, game);
    });
};

// Delete all reviews
const deleteReview = function(req, res, game) {
    console.log(game.reviews);
    game.reviews = [];
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            console.log("reviews are NOT deleted!");
            response.status = 500;
            response.message = err;
        } else {
            console.log("reviews are deleted successfuly!");
            response.status = 201;
            response.message = updatedGame.reviews;
        }
        console.log(game);
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewDelete = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("the game " + game);
        deleteReview(req, res, game);
    });
};

// Delete only one review
const deleteOneReview = function(req, res, review, game) {
    review.remove();
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewDeleteOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select('reviews').exec(function(err, game) {
        const review = game.reviews.id(reviewId);
        deleteOneReview(req, res, review, game);
    });
}

