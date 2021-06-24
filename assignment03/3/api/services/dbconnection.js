const mongoClient = require('mongodb').MongoClient;
const dbName = 'meanGamesDb';
const dburl = 'mongodb://localhost:27017/${dbName}';
let _connection;
let open = function() {
    mongoClient.connect(dburl,{useUnifiedTopology: true}, function(err, client) {
        if(err) {
            console.log('DB connection failed ' + err);
            return;
        }
        _connection = client.db(dbName);
        console.log("DB connection open");
    });
};
let get = function() {
    return _connection;
};
module.exports = {
    open : open,
    get : get
};