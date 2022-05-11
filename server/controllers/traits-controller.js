const traits = require("../tempSetInfo/traits.json");

const HttpError = require("../models/http-error");

function getAllTraits(req, res, next) {
    res.json(traits);
}

function getTraitByName(req, res, next) {
    const name = req.params.name;
    const trait = traits.find(t => {
        return t.name === name;
    })

    if (!trait) {
        throw new HttpError("Could not find a trait with the provided name.", 404);
    }

    res.json({trait}); // => {trait} => {trait: trait}
}

exports.getAllTraits = getAllTraits;
exports.getTraitByName = getTraitByName;