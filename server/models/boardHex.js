const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardHexSchema = new Schema({
    hexId: { type: Number, required: true },
    hasUnit: { type: Boolean, required: true },
    unitId: { type: String },
    unitName: { type: String },
    unitCost: { type: Number },
    unitIcon: { type: String },
    unitTraits: { type: [String], default: undefined }
    // unitItems: {}
});

module.exports = boardHexSchema;