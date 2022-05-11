const express = require("express");
const { check } = require("express-validator");

const teamCompsController = require("../controllers/teamComps-controller");

const router = express.Router();

router.get("/:id", teamCompsController.getTeamCompById);

router.get("/user/:userId", teamCompsController.getTeamCompsByUserId);

router.post(
    "/",
    [
        check("userId").not().isEmpty(),
        check("unitsOnBoard").not().isEmpty(),
        check("traits").not().isEmpty()
    ],
    teamCompsController.createTeamComp
);

router.patch("/:id", teamCompsController.updateTeamComp);

router.delete("/:id", teamCompsController.deleteTeamComp);

module.exports = router;