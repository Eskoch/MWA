const mongoose = require('mongoose');
const Game = mongoose.model('Game');

// Geo Search
const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    console.log("lat ", lat, " lng ", lng);

    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 6000000,
                $minDistance: 0
            }
        }
    };

    Game.find(query).exec(function (err, games) {
        if (err) {
            res.ststus(systemError).json({ "Error": err });
        }
        res.status(systemWorking).json(games);
    });
};

module.exports.gamesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 100;
    let maxCount = 100;
    
    if(req.query && req.query.lat && req.query.lng) {
        console.log("calling geo search method...");
        runGeoQuery(req, res);
        return;
    }

    if(req.query && req.query.lat && req.query.lng) {
        console.log("calling geo search method...");
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
            console.log("my game is " + game);
            if (err) {
                console.log("Error creating games"); 
                res.status(400).json(err);
            } else {
                console.log("Game created", game);
                res.status(201).json(game); 
            }
        }
    ); 
};



// Update
module.exports.gamesFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findById(gameId).exec(function(err, game) {
        game.title = req.body.title;
        game.year = parseInt(req.body.year);
        game.price = parseFloat(req.body.price); 
        game.designers = req.body.designers;
        game.minPlayers = parseInt(req.body.minPlayers);
        game.maxPlayers = parseInt(req.body.maxPlayers);
        game.rate = parseFloat(req.body.rate);
        game.minAge = parseFloat(req.body.minAge);
        game.save();
        res.status(200).json(game);
        
    });
};

module.exports.gamesPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findById(gameId).exec(function(err, game) {
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
        game.save();
        res.status(200).json(game);
        
    });
};

// delete
module.exports.gamesDeleteOne = function(req, res) {
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    Game.findByIdAndDelete(gameId).exec(function(err, game) {
        res.status(200).json(game);
    });
};

