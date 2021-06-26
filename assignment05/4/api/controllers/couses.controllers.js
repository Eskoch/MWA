const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.coursesGetAll = function(req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err, courses) {
        res.status(200).json(courses);
    });
};
// module.exports.coursesGetOne = function(req, res) {
//     const studentId = req.params.studentId;
//     const courseId = req.params.courseId;
//     Student.findById(studentId).select("courses").exec(function(err, students) {
//         const course = students.courses.id(courseId);
//         res.status(200).json(course);
//     });
// };
module.exports.coursesGetOne = function(req, res) {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    Student.findById(studentId).select('courses').find({_id:ObjectID("60d54081669c9593942055e8")}).exec(function(err, course) {
        console.log("course is " + course);
        // const review = students.courses.id(courseId);
        res.status(200).json(course);
    });
}