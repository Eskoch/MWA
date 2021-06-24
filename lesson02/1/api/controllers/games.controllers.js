const dbconnection= require("../data/dbconnection.js");

module.exports.gamesGetAll = function(req, res) {
    const db = dbconnection.get();
    const collection = db.collection('games');
    const docs = collection.find();
    // collection.find().toArray(function(err, docs) {
    //     res.status(200).json(docs);
    // });

    console.log(req.query);
    let offset = 0;
    let count = 4;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > 8) count = 8;
    }
    collection.find().skip(offset).limit(count).toArray(function (err, docs) {
        res.status(200).json(docs);
    });
};
module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;
    const theGame = gamesData[gameId];
    console.log("GET game with gameId " + gameId);
    res.status(200).json(theGame);
};