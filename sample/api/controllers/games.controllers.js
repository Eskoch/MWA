const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const systemError = 500;
const userError = 400;
const OK = 200;

module.exports.gamesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 100;
    let maxCount = 8;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Game.find().skip(offset).limit(count).exec(function (err, games) {
        const response = {
            status: OK,
            message: games
        }
        if(err) {
            console.log("Error getting all games", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Games ' + games.length);
        res.status(response.status).json(response.message);
    });
};

module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findById(gameId).exec(function(err, game) {
        const response = {
            status: OK,
            message: game
        };
        if(err) {
            console.log("Error getting game with id " + gameId);
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

// ADD
module.exports.gamesAddOne = function(req, res) { 
    console.log("New game post body " + req.body);
    Game.create({
            title: req.body.title, 
            year: parseInt(req.body.year),
            price: parseFloat(req.body.price), 
            designers: req.body.designers, 
            minPlayers: parseInt(req.body.minPlayers), 
            maxPlayers: parseInt(req.body.maxPlayers), 
            rate: parseFloat(req.body.rate),
            // reviews: {name: req.body.name, rating: req.body.rating},
            // publisher: {name: req.body.name, rating: req.pody.review}
            reviews: req.body.reviews,
            publisher: req.body.publisher
        }, 
        function(err, game) {
            console.log("Game to be inserted is " + game);
            if (err) {
                console.log("Error creating games"); 
                res.status(400).json(err);
            } else {
                console.log("Game successfuly created " + game);
                res.status(201).json(game); 
            }
        }
    ); 
};



// Full Update
module.exports.gamesFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    if(gameId.length != 24) {
        res.status(userError).json({
            "message": "Requested param game id is not propper format!"
        });
    }
    Game.findById(gameId).exec(function(err, game) {
        const response = {
            status: OK,
            message: game
        };
        if(err) {
            console.log("Error finding game.");
            response.status = systemError;
            response.message = err;
        } else if(!game) {
            response.status = userError;
            response.message = {"message": "game id not found!"};
        }

        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price); 
            // game.designers = req.body.designers;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate);
            game.minAge = parseFloat(req.body.minAge);
            game.save(function(err, updatedGame) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Game updated successfuly");
                    response.message = updatedGame;
                }
            });
            
        }
        res.status(response.status).json(response.message);
    });
};

// Partial Update
module.exports.gamesPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findById(gameId).exec(function(err, game) {
        const response = {
            status: OK,
            message: game
        };
        if(err) {
            console.log("Error finding game.");
            response.status = systemError;
            response.message = err;
        } else if(!game) {
            response.status = userError;
            response.message = {"message": "game id not found!"};
        }

        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            if(req.body.title) {
                game.title = req.body.title;
            }
            if(req.body.year) {
                game.year = parseInt(req.body.year);
            }
            if(req.body.price) {
                game.price = parseFloat(req.body.price); 
            }
            if(req.body.designers) {
                game.designers = req.body.designers;
            }
            if(req.body.minPlayers) {
                game.minPlayers = parseInt(req.body.minPlayers);
            }
            if(req.body.maxPlayers) {
                game.maxPlayers = parseInt(req.body.maxPlayers);
            }
            if(req.body.rate) {
                game.rate = parseFloat(req.body.rate);
            }
            if(req.body.minAge) {
                game.minAge = parseFloat(req.body.minAge);
            }
            game.save(function(err, updatedGame) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Game updated successfuly");
                    response.message = updatedGame;
                }
            });
            res.status(response.status).json(response.message);
        };   
    });
};

// delete
module.exports.gamesDeleteOne = function(req, res) {
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findByIdAndDelete(gameId).exec(function(err, game) {
        const response = {
            status: OK,
            message: game
        };
        if(err) {
            console.log("Error finding game.");
            response.status = systemError;
            response.message = err;
        } else if(!game) {
            response.status = userError;
            response.message = {"message": "game id not found!"};
        }
        res.status(response.status).json(response.message);
    });
};

// search 
module.exports.gamesSearchOne = function(req, res) {
    const key = req.params.key;
    console.log(key);
    const query = {
        "rate": key
    }
    const projection = {
        _id: 0,
        title: 1,
        year: 2
    };
    Game.find(query, function(err, games) {
        const response = {
            status: OK,
            message: games
        };
        if(err) {
            console.log("Error finding game.");
            response.status = systemError;
            response.message = err;
        } else if(!game) {
            response.status = userError;
            response.message = {"message": "game not found!"};
        }
        res.status(response.status).json(response.message);
    }); 
};