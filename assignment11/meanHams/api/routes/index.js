const express = require('express');
const router = express.Router();

// hams
const hamsControllers = require('../controllers/hams.controllers');
router.route('/hams').get(hamsControllers.hamsGetAll)
                        .post(hamsControllers.hamsCreateOne);

router.route('/hams/:hamId').get(hamsControllers.hamsGetOne)
                            .put(hamsControllers.hamsFullUpdateOne)
                            .patch(hamsControllers.hamsPartialUpdate)
                            .delete(hamsControllers.hamsDeleteOne);

// types
const typesControllers = require('../controllers/types.controllers');
router.route('/hams/:hamId/types').get(typesControllers.typesGetAll)
                                    .post(typesControllers.typeAdd)
                                    .delete(typesControllers.typeDelete)
                                    .put(typesControllers.typeUpdate);
                                            
// contests
const contestControllers = require('../controllers/contests.controllers');
router.route('/hams/:hamId/contests').get(contestControllers.contestsGetAll)
                                        .post(contestControllers.contestAdd)
                                        .delete(contestControllers.contestDeleteAll)
router.route('/hams/:hamId/contests/:contestId').get(contestControllers.contestGetOne)
                                                .put(contestControllers.contestUpdateOne)
                                                .delete(contestControllers.contestDeleteOne);

const controllerUsers = require("../controllers/users.Controller");
router.route("/users").post(controllerUsers.register);                                           
router.route("/users/login").post(controllerUsers.login);

module.exports = router;