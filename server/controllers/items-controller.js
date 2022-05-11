const items = require("../tempSetInfo/items.json");

const HttpError = require("../models/http-error");

function getCraftableItems(req, res, next) {
    res.json(items.filter((item) => {
        return !item.isRadiant && !item.isElusive && item.id > 9;
    }));
}

function getRadiantItems(req, res, next) {
    res.json(items.filter(item => {
        return item.isRadiant;
    }));
}

function getElusiveItems(req, res, next) {
    res.json(items.filter(item => {
        return item.isElusive;
    }));
}

function getItemByName(req, res, next) {
    const name = req.params.name;
    const item = items.find(i => {
        return i.name === name;
    })
    if (!item) {
        throw new HttpError("Could not find a item with the provided name.", 404);
    }

    res.json({item}); // => {item} => {item: item}
}



exports.getCraftableItems = getCraftableItems;
exports.getRadiantItems = getRadiantItems;
exports.getElusiveItems = getElusiveItems;
exports.getItemByName = getItemByName;
