const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students.controller");
router.route("/students").get(studentsController.studentsGetAll);
router.route("/students/:studentId").get(studentsController.studentsGetOne);

const coursesController = require("../controllers/couses.controllers.js");
router.route("/students/:studentId/courses").get(coursesController.coursesGetAll);
router.route("/studnets/:studentId/:name").get(coursesController.coursesGetOne);

module.exports = router;