const express = require("express");

const itemsController = require("../controllers/items-controller");

const router = express.Router();

router.get("/", itemsController.getCraftableItems);

router.get("/elusive", itemsController.getElusiveItems);

router.get("/radiant", itemsController.getRadiantItems);

router.get("/:name", itemsController.getItemByName);

module.exports = router;