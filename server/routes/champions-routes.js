const express = require("express");

const championsController = require("../controllers/champions-controller");

const router = express.Router();

router.get("/", championsController.getAllChampions);
router.get("/GarenOnly", championsController.getGarenBoard);

router.get("/:name", championsController.getChampionByName);

router.get("/groupBy/:trait", championsController.getChampionGroupByTrait);

module.exports = router;