const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const systemError = 500;
const userError = 400;
const OK = 200;

module.exports.jobsGetAll = function(req, res) {
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
    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        const response = {
            status: OK,
            message: jobs
        }
        if(err) {
            console.log("Error getting all jobs", err);
            response.status = systemError;
            response.message = err;
        }
        console.log('Found Jobs ' + jobs.length);
        res.status(response.status).json(response.message);
    });
};

module.exports.jobsGetOne = function(req, res) {
    const jobId = req.params.jobId;
    console.log("GET job with jobId " + jobId);
    Job.findById(jobId).exec(function(err, job) {
        const response = {
            status: OK,
            message: job
        };
        if(err) {
            console.log("Error getting job with id " + jobId);
            response.status = systemError;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
};

// ADD
module.exports.jobsAddOne = function(req, res) { 
    console.log(req.body);
    Job.create({
            title: req.body.title, 
            salary: parseInt(req.body.salary),
            description: req.body.description, 
            location: req.body.location, 
            postDate: Date.parse(req.body.postDate),
            skills: req.body.skills,
            experience: req.body.experience
        }, 
        function(err, job) {
            console.log("Job to be inserted is " + job);
            const response = {
                status: OK,
                message: job
            };
            if(err) {
                console.log("Error creating job.");
                response.status = systemError;
                response.message = err;
            } else {
                console.log("Job successfuly created " + Job);
                res.status(response.status).json(response.message);
            }
        }
    ); 
};



// Full Update
module.exports.jobsFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const jobId = req.params.jobId;
    console.log("GET job with jobId " + jobId);
    if(jobId.length != 24) {
        res.status(userError).json({
            "message": "Requested param job id is not propper format!"
        });
    }
    Job.findById(jobId).exec(function(err, job) {
        const response = {
            status: OK,
            message: job
        };
        if(err) {
            console.log("Error finding job.");
            response.status = systemError;
            response.message = err;
        } else if(!job) {
            response.status = userError;
            response.message = {"message": "job id not found!"};
        }


        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            job.title = req.body.title;
            job.salary = parseInt(req.body.salary);
            job.description = req.body.description; 
            job.location = req.body.location;
            job.postDate = req.body.postDate;
            job.skills = req.body.skills;
            job.experience = req.body.experience;
            
            job.save(function(err, updatedJob) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Job updated successfuly");
                    response.message = updatedJob;
                }
            });
            
        }
        res.status(response.status).json(response.message);
    });
};

// Partial Update
module.exports.jobsPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    const jobId = req.params.jobId;
    console.log("GET job with jobId " + jobId);
    Job.findById(jobId).exec(function(err, job) {
        const response = {
            status: OK,
            message: job
        };
        if(err) {
            console.log("Error finding job.");
            response.status = systemError;
            response.message = err;
        } else if(!job) {
            response.status = userError;
            response.message = {"message": "job id not found!"};
        }

        if(response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            if(req.body.title) {
                job.title = req.body.title;
            }
            if(req.body.salary) {
                job.salary = parseInt(req.body.salary);
            }
            if(req.body.description) {
                job.description = req.body.description; 
            }
            if(req.body.location) {
                job.location = req.body.location;
            }
            if(req.body.postDate) {
                job.postDate = req.body.postDate;
            }
            if(req.body.maxPlayers) {
                job.skills = req.body.skills;
            }
            
            job.save(function(err, updatedJob) {
                if(err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    console.log("Job updated successfuly");
                    response.message = updatedJob;
                }
            });
            res.status(response.status).json(response.message);
        };   
    });
};

// delete
module.exports.jobsDeleteOne = function(req, res) {
    const jobId = req.params.jobId;
    console.log("GET job with jobId " + jobId);
    Job.findByIdAndDelete(jobId).exec(function(err, job) {
        const response = {
            status: OK,
            message: job
        };
        if(err) {
            console.log("Error finding job.");
            response.status = systemError;
            response.message = err;
        } else if(!job) {
            response.status = userError;
            response.message = {"message": "job id not found!"};
        }
        res.status(response.status).json(response.message);
    });
};

// search 
module.exports.jobsSearchOne = function(req, res) {
    const key = req.params.key;
    console.log("Searching... " + key);
    const query = {
        "title": key
    }
    const projection = {
        _id: 0,
        title: 1,
        year: 2
    };
    Job.find(query, function(err, jobs) {
        const response = {
            status: OK,
            message: jobs
        };
        if(err) {
            console.log("Error finding job.");
            response.status = systemError;
            response.message = err;
        } else if(!jobs) {
            response.status = userError;
            response.message = {"message": "job not found!"};
        }
        res.status(response.status).json(response.message);
    }); 
};