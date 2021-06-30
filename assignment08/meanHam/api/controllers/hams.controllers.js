const mongoose = require('mongoose');
const Ham = mongoose.model('Ham');
const systemError = 500;
const userError = 400;
const OK = 204;

// Read hams
module.exports.hamsGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 10; 
    let maxCount = 10;
    if(req.query && req.query.offset) {
        offset = parseIng(req.query.offset);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(userError).json({ "message": "Querystring offset and count must be numbers" });
        return;
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Ham.find().skip(offset).limit(count).exec(function(err, hams) {
        const response = {
            status: OK,
            message: hams
        };
        if (err) {
            console.log("Error finding hams", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Modes ' + hams.length);
        res.status(200).json(hams);
    });
};
module.exports.hamsGetOne = function(req, res) {
    const hamId = req.params.hamId;
    console.log('Getting ham with hamId ' + hamId);
    if (hamId.length != 24) {
        res.status(userError).json({ "message": "RequiestParam ham id is not propper format!" });
    }
    Ham.findById(hamId).exec(function(err, ham){
        const response = {
            status: OK,
            message: ham
        };
        if (err) {   
            console.log("Error finding ham mode");
            response.status = systemError;
            response.message = err;
        } else if (!ham) {
            response.status = userError;
            response.message = { "message": "ham id not found" };
        }
        res.status(200).json(ham);
    });
};

// Create hams
module.exports.hamsCreateOne = function(req, res) {
    console.log(req.body);
    Ham.create(req.body,
    function(err, ham) {
        console.log('Ham to be inserted is ' + ham);
        if (err) {
            console.log("Error creating ham"); 
            res.status(400).json(err);
        } else {
            console.log("Ham successfully created");
            res.status(201).json(ham); 
        }
    });
};

// Update 
module.exports.hamsFullUpdateOne = function(req, res) {
    console.log("Full update request received");
    const hamId = req.params.hamId;
    console.log("GET ham with hamId " + hamId);
    if (hamId.length != 24) {
        res.status(userError).json({ "message": "RequiestParam ham id is not propper format!" });
    }
    Ham.findById(hamId).exec(function(err, ham) {
        const response = {
            status: OK,
            message: ham
        };
        if (err) {   
            console.log("Error finding ham!");
            response.status = systemError;
            response.message = err;
        } else if (!ham) {
            response.status = userError;
            response.message = { "message": "ham id not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            ham.name = req.body.name;
            // ham.type = req.body.type;
            // ham.contests = req.body.contests;
            ham.save(function(err, updatedHam) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    response.message = updatedHam;
                }
            });
            res.status(response.status).json(response.message);
        }           
    });
};

module.exports.hamsPartialUpdate = function(req, res) {
    console.log("Partial update request received");
    const hamId = req.params.hamId;
    console.log("GET ham with hamId " + hamId);
    if (hamId.length != 24) {
        res.status(userError).json({ "message": "RequiestParam ham id is not propper format!" });
    }
    Ham.findById(hamId).exec(function(err, ham) {
        const response = {
            status: OK,
            message: ham
        };
        if (err) {   
            console.log("Error finding ham!");
            response.status = systemError;
            response.message = err;
        } else if (!ham) {
            response.status = userError;
            response.message = { "message": "ham id not found!" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            console.log('in partial update');
            if(req.body.name) {
                ham.name = req.body.name;
            }
            // if(req.body.type) {
            //     ham.type = req.body.type;
            // }
            // if(req.body.contest) {
            //     ham.contest = req.body.contest; 
            // }   
            
            ham.save(function(err, updatedHam) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    response.message = updatedHam;
                }
            });
            res.status(response.status).json(response.message);
        }        
    });
};

// delete
module.exports.hamsDeleteOne = function(req, res) {
    const hamId = req.params.hamId;
    console.log("GET ham with hamId " + hamId);
    Ham.findByIdAndDelete(hamId).exec(function(err, ham) {
        const response = {
            status: OK,
            message: ham
        };
        if (err) {   
            console.log("Error finding ham!");
            response.status = systemError;
            response.message = err;
        } else if (!ham) {
            response.status = userError;
            response.message = { "message": "ham id not found!" };
        }
        res.status(response.status).json(response.message);
    });
};