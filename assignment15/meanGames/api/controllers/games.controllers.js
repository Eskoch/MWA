const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const systemError = 500;
const userError = 400;
const OK = 200;

// geo search
const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const rad = parseFloat(req.query.rad);

    console.log("lat ", lat, " lng ", lng, " radius ", rad);

    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: rad,
                $minDistance: 0
            }
        }
    };

    let offset = 0;
    let maxCount = 10;
    let count = 10;

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Game.find(query).skip(offset).limit(count).exec(function (err, games) {
        const response = {
            status: OK,
            message: games
        }
        if(err) {
            console.log("Error getting games", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Games ' + games.length);
        res.status(response.status).json(response.message);
    });
};

// games get all
module.exports.gamesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 10;
    let maxCount = 10;
    // Geo Search
    if(req.query && req.query.lat != 0 && req.query.lng != 0 && req.query.rad) {
        console.log("redirecting to geo search...");
        runGeoQuery(req, res);
        return;
    }
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
// games get one
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
    console.log("New game post body ");
    console.log(req.body);
    Game.create({
            title: req.body.title, 
            year: parseInt(req.body.year),
            price: parseFloat(req.body.price), 
            designers: req.body.designers, 
            minPlayers: parseInt(req.body.minPlayers), 
            maxPlayers: parseInt(req.body.maxPlayers), 
            rate: parseFloat(req.body.rate),
            reviews: req.body.reviews
        }, 
        function(err, game) {
            console.log("Game to be inserted is " + game);
            const response = {
                status: OK,
                message: game
            };
            if(err) {
                console.log("Error creating game.");
                response.status = systemError;
                response.message = err;
            } else {
                console.log("Game successfuly created " + game);
                res.status(response.status).json(response.message);
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
            game.designers = req.body.designers;
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
    const options = {
        "sort": [["title", "asc"], ["year", "desc"]]
    }
    Game.find(query, function(err, games) {
        const response = {
            status: OK,
            message: games
        };
        if(err) {
            console.log("Error finding game.");
            response.status = systemError;
            response.message = err;
        } else if(!games) {
            response.status = userError;
            response.message = {"message": "game not found!"};
        }
        res.status(response.status).json(response.message);
    }); 
};