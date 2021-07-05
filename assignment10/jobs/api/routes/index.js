const express = require("express");
const router = express.Router();

const controllerJobs = require("../controllers/jobs.controllers");

router.route("/jobs").get(controllerJobs.jobsGetAll)
                       .post(controllerJobs.jobsAddOne);
                       
router.route("/jobs/:jobId").get(controllerJobs.jobsGetOne)
                               .put(controllerJobs.jobsFullUpdateOne)
                               .patch(controllerJobs.jobsPartialUpdate)
                               .delete(controllerJobs.jobsDeleteOne);

router.route("/jobs/search/:key").get(controllerJobs.jobsSearchOne);

module.exports = router;
