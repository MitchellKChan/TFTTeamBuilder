const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardHexSchema = new Schema({
    hexId: { type: Number, required: true },
    hasUnit: { type: Boolean, required: true },
    unitId: { type: String, required: true },
    unitName: { type: String, required: true },
    unitCost: { type: Number, required: true },
    unitIcon: { type: String, required: true },
    unitTraits: { type: [String], required: true }
    // unitItems: {}
});

module.exports = boardHexSchema;