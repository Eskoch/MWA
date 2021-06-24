const dbconnection = require('../services/dbconnection.js');
module.exports.gamesGetAll = function(req, res) {
    const db = dbconnection.get();
    const collection = db.collection('games');
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