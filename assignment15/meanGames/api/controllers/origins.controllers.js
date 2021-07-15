const mongoose = require('mongoose');
const Origin = mongoose.model('Origin');
const systemError = 500;
const userError = 400;
const OK = 200;

// Add oigins to collection
module.exports.originAddOne = function(req, res) { 
    console.log("New request post body ");
    console.log(req.body);
    Origin.create(req.body, 
        function(err, request) {
            console.log("Request to be inserted is " + request);
            const response = {
                status: OK,
                message: request
            };
            if(err) {
                console.log("Error creating request.");
                response.status = systemError;
                response.message = err;
            } else {
                console.log("Request successfuly created " + request);
                res.status(response.status).json(response.message);
            }
        }
    ); 
};

// Get origins from collection
module.exports.originGetOne = function(req, res) {
    const originId = req.params.originId;
    console.log("GET origin with originId " + originId);
    Origin.findById(originId).exec(function(err, origin) {
        const response = {
            status: OK,
            message: origin
        };
        if(err) {
            console.log("Error getting origin with id " + originId);
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.originsSearchOne = function(key) {
    console.log("Key " + key);
    const query = {
        "domain": key
    }
    Origin.findOne(query, function(err, origin) {
        const response = {
            status: OK,
            message: origin
        };
        if(err) {
            console.log("Error finding origin.");
            response.status = systemError;
            response.message = err;
        } else if(!origin) {
            console.log("origin is undifind")
            response.status = userError;
            response.message = {"message": "origin not found!"};
        }
        console.log(origin);
        let result = origin.status;
        console.log(result);
        return result;
    }); 

};

