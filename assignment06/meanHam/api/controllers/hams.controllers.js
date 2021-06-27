const mongoose = require('mongoose');
const Ham = mongoose.model('Ham');

// Read hams
module.exports.hamsGetAll = function(req, res) {
    console.log(req.query);
    let offset = 0;
    let count = 10; 
    let maxCount = 10
    if(req.query && req.query.offset) {
        offset = parseIng(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Ham.find().skip(offset).limit(count).exec(function(err, hams) {
        console.log('Found Modes ' + hams.length);
        res.status(200).json(hams);
    });
};
module.exports.hamsGetOne = function(req, res) {
    const hamId = req.params.hamId;
    console.log('Getting ham with hamId ' + hamId);
    Ham.findById(hamId).exec(function(err, ham){
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
    Ham.findById(hamId).exec(function(err, ham) {
        ham.name = req.body.name;
        // ham.type = req.body.type;
        // ham.contests = req.body.contests;
        ham.save();
        res.status(200).json(ham);     
    });
};

module.exports.hamsPartialUpdate = function(req, res) {
    console.log("Partial update request received");
    const hamId = req.params.hamId;
    console.log("GET ham with hamId " + hamId);
    Ham.findById(hamId).exec(function(err, ham) {
        if(req.body.name) {
            ham.name = req.body.name;
        }
        if(req.body.type) {
            ham.type = req.body.type;
        }
        if(req.body.contest) {
            ham.contest = req.body.contest; 
        }     
        ham.save();
        res.status(200).json(ham);
        
    });
};

// delete
module.exports.hamsDeleteOne = function(req, res) {
    const hamId = req.params.hamId;
    console.log("GET ham with hamId " + hamId);
    Ham.findByIdAndDelete(hamId).exec(function(err, ham) {
        res.status(200).json(ham);
    });
};