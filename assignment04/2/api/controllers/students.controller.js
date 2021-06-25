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
        console.log("Found students " + students.length);
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