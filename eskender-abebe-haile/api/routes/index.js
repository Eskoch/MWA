const express = require("express");
const router = express.Router();

const controllerZips = require("../controllers/zips.controllers");

router.route("/zips").get(controllerZips.zipsGetAll)
                       .post(controllerZips.zipsAddOne);
                       
router.route("/zips/:zipId").get(controllerZips.zipsGetOne)
                               .put(controllerZips.zipsFullUpdateOne)
                               .patch(controllerZips.zipsPartialUpdate)
                               .delete(controllerZips.zipsDeleteOne);

router.route("/zips/search/:key").get(controllerZips.zipsSearchOne);

module.exports = router;
