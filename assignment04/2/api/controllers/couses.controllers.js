const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.coursesGetAll = function(req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err, courses) {
        res.status(200).json(courses);
    });
};
module.exports.coursesGetOne = function(req, res) {
    const studentId = req.params.studentId;
    const name = req.params.name;
    Student.findById(studentId).find("courses").select(name).exec(function(err, course) {
        res.status(200).json(course);
    });
};