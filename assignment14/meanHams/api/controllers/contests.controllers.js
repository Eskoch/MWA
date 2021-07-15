const mongoose = require('mongoose');
const Ham = mongoose.model('Ham');

// Get
module.exports.contestsGetAll = function(req, res) {
    const hamId = req.params.hamId;
    Ham.findById(hamId).select('contests').exec(function(err, contests) {
        console.log('Found contests ' + contests);
        res.status(200).json(contests);
    });
};

module.exports.contestGetOne = function(req, res) {
    const hamId = req.params.hamId;
    const contestId = req.params.contestId;
    Ham.findById(hamId).select('contests').exec(function(err, hams) {
        const contest = hams.contests.id(contestId);
        res.status(200).json(contest)
    });
};

// Insert new Contest
const _addContest = function(req, res, ham) {
    console.log("from add method");
    ham.contests.push(req.body); 
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.contests;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.contestAdd = function(req, res) {
    const hamId = req.params.hamId;
    console.log("Get hamId ", hamId); 
    Ham.findById(hamId).exec(function(err, ham) {
        console.log("the ham " + ham);
        _addContest(req, res, ham);
    });
};

// Update one contest
module.exports.contestUpdateOne = function(req, res) {
    const hamId = req.params.hamId;
    const contestId = req.params.contestId;
    Ham.findById(hamId).select('contests').exec(function(err, ham) {
        const contest = ham.contests.id(contestId);
        updateContest(req, res, contest, ham);
    });
}

const updateContest = function(req, res, contest, ham) {
    contest.name = req.body.name;
    contest.month = req.body.month;
    contest.hours = parseFloat(req.body.hours);
    contest.prize = req.body.prize;
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.contests;
        }
        res.status(response.status).json(response.message);
    });
}

// Delete only one contest
const deleteOneContest = function(req, res, contest, ham) {
    contest.remove();
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedham.contest;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.contestDeleteOne = function(req, res) {
    const hamId = req.params.hamId;
    const contestId = req.params.contestId;
    Ham.findById(hamId).select('contests').exec(function(err, ham) {
        const contest = ham.contests.id(contestId);
        deleteOneContest(req, res, contest, ham);
    });
};

// Delete all contests
module.exports.contestDeleteAll = function(req, res) {
    const hamId = req.params.hamId;
    Ham.findById(hamId).exec(function(err, ham) {
        console.log("the ham " + ham);
        deleteContest(req, res, ham);
    });
};
const deleteContest = function(req, res, ham) {
    console.log(ham.contests);
    ham.contests = [];
    ham.save(function(err, updatedham) {
        const response = {status: 200, message: []};
        if(err) {
            console.log("contests are NOT deleted!");
            response.status = 500;
            response.message = err;
        } else {
            console.log("contests are deleted successfuly!");
            response.status = 201;
            response.message = updatedham.contests;
        }
        console.log(ham);
        res.status(response.status).json(response.message);
    });
};
