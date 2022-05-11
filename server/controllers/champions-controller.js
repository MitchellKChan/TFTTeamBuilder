const champions = require("../tempSetInfo/champions.json");

const HttpError = require("../models/http-error");
const genDummyBoard = require("../modules/genDummyBoard");

function getGarenBoard(req, res, next) {
    res.json(genDummyBoard.genDummyBoard());
}

function getAllChampions(req, res, next) {
    res.json(champions);
}

function getChampionByName(req, res, next) {
    const name = req.params.name;
    const champion = champions.find(c => {
        return c.name === name;
    })

    if (!champion) {
        throw new HttpError("Could not find a champion with the provided name.", 404);
    }

    res.json({champion}); // => {champion} => {champion: champion}
}

function getChampionGroupByTrait(req, res, next) {
    const trait = req.params.trait;
    const championGroup = champions.filter(c => {
        return c.traits.includes(trait);
    })

    if (championGroup.length === 0) {
        return next(
            new HttpError("Could not find champions with the provided trait.", 404)
        );
    }

    res.json({championGroup});
}

exports.getAllChampions = getAllChampions;
exports.getChampionByName = getChampionByName;
exports.getChampionGroupByTrait = getChampionGroupByTrait;
exports.getGarenBoard = getGarenBoard;