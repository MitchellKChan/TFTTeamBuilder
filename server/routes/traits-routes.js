const express = require("express");

const traitsController = require("../controllers/traits-controller");

const router = express.Router();

router.get("/", traitsController.getAllTraits);

router.get("/:name", traitsController.getTraitByName);

module.exports = router;