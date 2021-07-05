const mongoose = require('mongoose');
const Zip = mongoose.model('Zip');
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
        "loc": {
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

    // Zip.find(query, function(err, zips) {
    //     const response = {
    //         status: OK,
    //         message: zips
    //     };
    //     if(err) {
    //         console.log("Error finding zip.");
    //         response.status = systemError;
    //         response.message = err;
    //     } else if(!zips) {
    //         response.status = userError;
    //         response.message = {"message": "zip not found!"};
    //     }
    //     // console.log(response.message);
    //     res.status(response.status).json(response.message);
    // });
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
    Zip.find(query).skip(offset).limit(count).exec(function (err, zips) {
        const response = {
            status: OK,
            message: zips
        }
        if(err) {
            console.log("Error getting zips", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Zips ' + zips.length);
        res.status(response.status).json(response.message);
    });
};

// zips get all
module.exports.zipsGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let maxCount = 10;
    let count = 10;
    // Geo Search
    if(req.query && req.query.lat && req.query.lng && req.query.rad) {
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
    Zip.find().skip(offset).limit(count).exec(function (err, zips) {
        const response = {
            status: OK,
            message: zips
        }
        if(err) {
            console.log("Error getting all zips", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Zips ' + zips.length);
        res.status(response.status).json(response.message);
    });
};

// zips get one
module.exports.zipsGetOne = function(req, res) {
    const zipId = req.params.zipId;
    console.log("GET zip with zipId " + zipId);
    Zip.findById(zipId).exec(function(err, zip) {
        const response = {
            status: OK,
            message: zip
        };
        if(err) {
            console.log("Error getting zip with id " + zipId);
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

// ADD
module.exports.zipsAddOne = function(req, res) { 
    console.log(req.body);
    Zip.create(req.body, 
        function(err, zip) {
            console.log("Zip to be inserted is " + zip);
            const response = {
                status: OK,
                message: zip
            };
            if(err) {
                console.log("Error creating zip.");
                response.status = systemError;
                response.message = err;
                console.log(err);
            } else {
                console.log("Zip successfuly created " + zip);
                res.status(response.status).json(response.message);
            }
        }
    ); 
};

// Full Update
module.exports.zipsFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const zipId = req.params.zipId;
    console.log("GET zip with zipId " + zipId);
    if(zipId.length != 24) {
        res.status(userError).json({
            "message": "Requested param zip id is not propper format!"
        });
    }
    Zip.findById(zipId).exec(function(err, zip) {
        const response = {
            status: OK,
            message: zip
        };
        if(err) {
            console.log("Error finding zip.");
            response.status = systemError;
            response.message = err;
        } else if(!zip) {
            response.status = userError;
            response.message = {"message": "zip id not found!"};
        }


        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            zip.city = req.body.city;
            zip.zip = req.body.zip;
            zip.pop = req.body.pop; 
            zip.state = req.body.state;
            zip.loc = req.body.loc;
            
            zip.save(function(err, updatedZip) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Zip updated successfuly");
                    response.message = updatedZip;
                }
            });
            
        }
        res.status(response.status).json(response.message);
    });
};

// Partial Update
module.exports.zipsPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    const zipId = req.params.zipId;
    console.log("GET zip with zipId " + zipId);
    Zip.findById(zipId).exec(function(err, zip) {
        const response = {
            status: OK,
            message: zip
        };
        if(err) {
            console.log("Error finding zip.");
            response.status = systemError;
            response.message = err;
        } else if(!zip) {
            response.status = userError;
            response.message = {"message": "zip id not found!"};
        }

        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            if(req.body.city) {
                zip.city = req.body.city;
            }
            if(req.body.zip) {
                zip.zip = req.body.zip;
            }
            if(req.body.zip) {
                zip.pop = parseInt(req.body.pop); 
            }
            if(req.body.state) {
                zip.state = req.body.state;
            }
            if(req.body.loc) {
                zip.loc = req.body.loc;
            }
            
            zip.save(function(err, updatedZip) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Zip updated successfuly");
                    response.message = updatedZip;
                }
            });
            res.status(response.status).json(response.message);
        };   
    });
};

// delete
module.exports.zipsDeleteOne = function(req, res) {
    const zipId = req.params.zipId;
    console.log("GET zip with zipId " + zipId);
    Zip.findByIdAndDelete(zipId).exec(function(err, zip) {
        const response = {
            status: OK,
            message: zip
        };
        if(err) {
            console.log("Error finding zip.");
            response.status = systemError;
            response.message = err;
        } else if(!zip) {
            response.status = userError;
            response.message = {"message": "zip id not found!"};
        }
        res.status(response.status).json(response.message);
    });
};

// search 
module.exports.zipsSearchOne = function(req, res) {
    const key = req.params.key;
    console.log("Searching for" + key);
    const query = {
        "city": key
    }
    const projection = {
        _id: 0,
        title: 1,
        year: 2
    };
    const options = {
        "sort": [["title", "asc"], ["year", "desc"]]
    }
    Zip.find(query, function(err, zips) {
        const response = {
            status: OK,
            message: zips
        };
        if(err) {
            console.log("Error finding zip.");
            response.status = systemError;
            response.message = err;
        } else if(!zips) {
            response.status = userError;
            response.message = {"message": "zip not found!"};
        }
        res.status(response.status).json(response.message);
    }); 
};