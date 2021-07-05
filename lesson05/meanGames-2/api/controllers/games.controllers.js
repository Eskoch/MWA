const mongoose = require('mongoose');
const hardening = require('./hardening');
const Game = mongoose.model('Game');

module.exports.gamesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 10;
    let maxCount = 20;
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
            // if (err) {
            //     console.log("Error creating games"); 
            //     res.status(400).json(err);
            // } else {
            //     console.log("Game created", game);
            //     res.status(201).json(game); 
            // }
            const response = hardening.harden(err, game);
            res.status(response.status).json(response.message);
        }
    ); 
};



// Update
module.exports.gamesFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    console.log("GET game with gameId " + gameId);
    console.log(req.body);
    Game.findById(gameId).exec(function(err, game) {
        game.title = req.body.title;
        game.year = parseInt(req.body.year);
        game.price = parseInt(req.body.price); 
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
        console.log("result is ");
        console.log(games);
        res.status(200).json(games);
    });
    
}


// module.exports.authenticate = function(req, res, next) {
//     const headerExists = req.heders.authorization;
//     if(headerExists) {
//         const token = req.headers.authorization.split("")[1];
//         jwt.verify(token, "cs572", function(err, decodedToken) {
//             if(err) {
//                 console.log("jwt verify error", err);
//                 res.status(401).json({message: "Unauthorized"});
//             } else {
//                 next();
//             }
//         })
//     } else {
//         console.log("jwt verify error", err);
//         res.status(403).json({message: "Token missing."});
//     }
// };