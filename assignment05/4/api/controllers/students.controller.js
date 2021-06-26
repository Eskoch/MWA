const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function(req, res) {
    console.log("Getting all students...");
    console.log(req.query);
    let offset = 0;
    let count = 5;
    let maxCount = 10;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
        if(count > maxCount) count = maxCount;
    }
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        console.log("Found students ");
        res.status(200).json(students);
    });
};
module.exports.studentsGetOne = function(req, res) {
    const studentId = req.params.studentId;
    console.log("Get student with student ID " + studentId);
    Student.findById(studentId).exec(function(err, student) {
        res.status(200).json(student);
    });
};


// Create new student
module.exports.studentsAddOne = function(req, res) { 
    console.log("New student post body " + req.body);
    Student.create({
            name: req.body.name, 
            GPA: parseFloat(req.body.GPA),
            courses: req.body.courses
        }, 
        function(err, student) {
            console.log("my student is " + student);
            if (err) {
                console.log("Error creating student"); 
                res.status(400).json(err);
            } else {
                console.log("Game created", student);
                res.status(201).json(student); 
            }
        }
    ); 
};

// Update
module.exports.studentFullUpdateOne = function(req, res) {
    console.log("FullUpdateOne request received");
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err, student) {
        console.log(student);
        student.name = req.body.name, 
        student.GPA = parseFloat(req.body.GPA),
        student.courses = req.body.courses
        student.save();
        res.status(200).json(student);
        
    });
};

module.exports.studentPartialUpdate = function(req, res) {
    console.log("FullUpdateOne request received");
    console.log(req.body)
    const studentId = req.params.studentId;

    Student.findById(studentId).exec(function(err, student) {
        console.log(student);
        res.status(200).json(student);
        if(req.body.name) {
            student.name = req.body.name;
        }
        if(req.body.GPA) {
            student.GPA = parseFloat(req.body.GPA);
        }
        if(req.body.courses) {
            student.courses = req.body.courses; 
        }
        game.save();
        res.status(200).json(student);
    });
};

// Delete 
module.exports.studentsDeleteOne = function(req, res) {
    const studentId = req.params.studentId;
    console.log("Get student with student ID " + studentId);
    Student.findByIdAndDelete(studentId).exec(function(err, student) {
        res.status(200).json(student);
    });
};