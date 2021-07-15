const mongoose = require('mongoose');
const Game = mongoose.model('Game');

// GET
module.exports.publishersGetAll = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select('publisher').exec(function(err, publishers) {
        console.log('Found publishers ' + publishers);
        res.status(200).json(publishers);
    });
}

module.exports.publishersGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const publisherId = req.params.publisherId;
    Game.findById(gameId).select('publishers').exec(function(err, games) {
        const publisher = games.publishers.id(publisherId);
        res.status(200).json(publisher)
    });
}

// Insert new publisher
const _addPublisher = function(req, res, game) {
    console.log("form add method");
    game.publisher.name = req.body.name,
    game.publisher.country = req.body.country
    
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherAdd = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("the game " + game);
        _addPublisher(req, res, game);
    });
};

// Update existing publisher 
const updatePublisher = function(req, res, game) {
    console.log("from update method " + game);
    game.publisher.name = req.body.name,
    game.publisher.country = req.body.country
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherUpdate = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("the game " + game);
        updatePublisher(req, res, game);
    });
};

// delete publisher
const deletePublisher = function(req, res, game) {
    game.publisher.remove();
    game.save(function(err, updatedGame) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.publisherDelete = function(req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId); 
    Game.findById(gameId).exec(function(err, game) {
        console.log("the game " + game);
            deletePublisher(req, res, game);
    });
};