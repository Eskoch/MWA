const express = require("express");
const router = express.Router();

const controllerLaureates = require("../controllers/laureates.controllers");

router.route("/laureates").get(controllerLaureates.laureatesGetAll)
                       .post(controllerLaureates.laureatesAddOne);
                       
router.route("/laureates/:laureateId").get(controllerLaureates.laureatesGetOne)
                               .put(controllerLaureates.laureatesFullUpdateOne)
                               .patch(controllerLaureates.laureatesPartialUpdate)
                               .delete(controllerLaureates.laureatesDeleteOne);

router.route("/laureates/search/:key").get(controllerLaureates.laureatesSearchOne);

module.exports = router;
