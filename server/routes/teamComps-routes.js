const express = require("express");
const { check } = require("express-validator");

const teamCompsController = require("../controllers/teamComps-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", teamCompsController.getAllTeamComps);

router.get("/:id", teamCompsController.getTeamCompById);

router.get("/user/:creator", teamCompsController.getTeamCompsByUserId);

router.use(checkAuth);

router.post(
    "/",
    [
        check("compName").not().isEmpty(),
        check("set").not().isEmpty(),
        check("boardState").not().isEmpty(),
        check("unitsOnBoard").not().isEmpty(),
        check("traits").not().isEmpty()
    ],
    teamCompsController.createTeamComp
);

router.patch("/:id", teamCompsController.updateTeamComp);

router.delete("/:id", teamCompsController.deleteTeamComp);

module.exports = router;