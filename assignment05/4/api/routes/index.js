const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students.controller.js");
router.route("/students").get(studentsController.studentsGetAll)
                         .post(studentsController.studentsAddOne);
                         
router.route("/students/:studentId").get(studentsController.studentsGetOne)
                                    .put(studentsController.studentFullUpdateOne)
                                    .patch(studentsController.studentPartialUpdate)
                                    .delete(studentsController.studentsDeleteOne);

const coursesController = require("../controllers/couses.controllers.js");
router.route("/students/:studentId/courses").get(coursesController.coursesGetAll);
router.route("/students/:studentId/courses/:courseId").get(coursesController.coursesGetOne);

module.exports = router;