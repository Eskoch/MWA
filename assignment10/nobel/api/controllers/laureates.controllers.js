const mongoose = require('mongoose');
const Laureate = mongoose.model('Laureate');
const systemError = 500;
const userError = 400;
const OK = 200;

module.exports.laureatesGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 10;
    let maxCount = 10;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Laureate.find().skip(offset).limit(count).exec(function (err, laureates) {
        const response = {
            status: OK,
            message: laureates
        }
        if(err) {
            console.log("Error getting all laureates", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Laureates ' + laureates.length);
        res.status(response.status).json(response.message);
    });
};

module.exports.laureatesGetOne = function(req, res) {
    const laureateId = req.params.laureateId;
    console.log("GET laureate with laureateId " + laureateId);
    Laureate.findById(laureateId).exec(function(err, laureate) {
        const response = {
            status: OK,
            message: laureate
        };
        if(err) {
            console.log("Error getting laureate with id " + laureateId);
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

// ADD
module.exports.laureatesAddOne = function(req, res) { 
    console.log("New laureate post body " + req.body);
    Laureate.create({
        firstname: req.body.firstname, 
        surname: req.body.surname,
        affiliation: req.body.affiliation, 
        category: req.body.category, 
        bornCountry: req.body.bornCountry, 
        motivation: req.body.motivation, 
        gender: req.body.gender     
    }, 
        function(err, laureate) {
            console.log("Laureate to be inserted is " + laureate);
            const response = {
                status: OK,
                message: laureate
            };
            if(err) {
                console.log("Error creating laureate.");
                response.status = systemError;
                response.message = err;
            } else {
                console.log("Laureate successfuly created " + laureate);
                res.status(response.status).json(response.message);
            }
        }
    ); 
};



// Full Update
module.exports.laureatesFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const laureateId = req.params.laureateId;
    console.log("GET laureate with laureateId " + laureateId);
    if(laureateId.length != 24) {
        res.status(userError).json({
            "message": "Requested param laureate id is not propper format!"
        });
    }
    Laureate.findById(laureateId).exec(function(err, laureate) {
        const response = {
            status: OK,
            message: laureate
        };
        if(err) {
            console.log("Error finding laureate.");
            response.status = systemError;
            response.message = err;
        } else if(!laureate) {
            response.status = userError;
            response.message = {"message": "laureate id not found!"};
        }


        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            laureate.firstname = req.body.firstname;
            laureate.surname = req.body.surname;
            laureate.affiliation = req.body.affiliation; 
            laureate.category = req.body.category;
            laureate.bornCountry = req.body.bornCountry;
            laureate.motivation = req.body.motivation;
            laureate.gender = req.body.gender;
            
            laureate.save(function(err, updatedLaureate) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Laureate updated successfuly");
                    response.message = updatedLaureate;
                }
            });
         
        }
        res.status(response.status).json(response.message);
    });
};

// Partial Update
module.exports.laureatesPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    const laureateId = req.params.laureateId;
    console.log("GET laureate with laureateId " + laureateId);
    Laureate.findById(laureateId).exec(function(err, laureate) {
        const response = {
            status: OK,
            message: laureate
        };
        if(err) {
            console.log("Error finding laureate.");
            response.status = systemError;
            response.message = err;
        } else if(!laureate) {
            response.status = userError;
            response.message = {"message": "laureate id not found!"};
        }

        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            if(req.body.firstname) {
                llaureate.firstname = req.body.firstname;
            }
            if(req.body.surname) {
                laureate.surname = req.body.surname;
            }
            if(req.body.affiliation) {
                laureate.affiliation = req.body.affiliation; 
            }
            if(req.body.category) {
                laureate.category = req.body.category;
            }
            if(req.body.bornCountry) {
                laureate.bornCountry = req.body.bornCountry;
            }
            if(req.body.motivation) {
                laureate.motivation = req.body.motivation;
            }
            

            laureate.save(function(err, updatedLaureate) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Laureate updated successfuly");
                    response.message = updatedLaureate;
                }
            });
            res.status(response.status).json(response.message);
        };   
    });
};

// delete
module.exports.laureatesDeleteOne = function(req, res) {
    const laureateId = req.params.laureateId;
    console.log("GET laureate with laureateId " + laureateId);
    Laureate.findByIdAndDelete(laureateId).exec(function(err, laureate) {
        const response = {
            status: OK,
            message: laureate
        };
        if(err) {
            console.log("Error finding laureate.");
            response.status = systemError;
            response.message = err;
        } else if(!laureate) {
            response.status = userError;
            response.message = {"message": "laureate id not found!"};
        }
        res.status(response.status).json(response.message);
    });
};

// search 
module.exports.laureatesSearchOne = function(req, res) {
    const key = req.params.key;
    console.log(key);
    const query = {
        "firstname": key
    }
    const projection = {
        _id: 0,
        title: 1,
        year: 2
    };
    Laureate.find(query, function(err, laureates) {
        const response = {
            status: OK,
            message: laureates
        };
        if(err) {
            console.log("Error finding laureate.");
            response.status = systemError;
            response.message = err;
        } else if(!laureates) {
            response.status = userError;
            response.message = {"message": "laureate not found!"};
        }
        res.status(response.status).json(response.message);
    }); 
};