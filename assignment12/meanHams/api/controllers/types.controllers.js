const mongoose = require('mongoose');
const Ham = mongoose.model('Ham');

// GET
module.exports.typesGetAll = function(req, res) {
    const hamId = req.params.hamId;
    Ham.findById(hamId).select('type').exec(function(err, types) {
        console.log('Found types ' + types);
        res.status(200).json(types);
    });
}

// Create new type
const _addtype = function(req, res, ham) {
    console.log("from add method");
    console.log(ham.type);
    ham.type === null ? ham.type={} : ham.type=ham.type;
    console.log(ham.type);
    ham.type.name = req.body.name;
    ham.type.desc = req.body.desc;
    
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.type;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.typeAdd = function(req, res) {
    const hamId = req.params.hamId;
    Ham.findById(hamId).exec(function(err, ham)  {
        console.log("the ham " + ham);
        _addtype(req, res, ham);
    });
};

// Update existing type 
const updatetype = function(req, res, ham) {
    console.log("from update method " + ham);
    ham.type.name = req.body.name;
    ham.type.desc = req.body.desc;
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.type;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.typeUpdate = function(req, res) {
    const hamId = req.params.hamId;
    Ham.findById(hamId).exec(function(err, ham) {
        console.log("the ham " + ham);
        updatetype(req, res, ham);
    });
};

// delete type
const deletetype = function(req, res, ham) {
    ham.type.remove();
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.type;
        }
        res.status(response.status).json(response.message);
    });
}
module.exports.typeDelete = function(req, res) {
    const hamId = req.params.hamId;
    console.log("Get hamId ", hamId); 
    Ham.findById(hamId).exec(function(err, ham) {
        console.log("the ham " + ham);
            deletetype(req, res, ham);
    });
};