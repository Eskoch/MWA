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