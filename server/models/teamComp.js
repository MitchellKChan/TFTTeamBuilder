const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamCompSchema = new Schema({
    userId: { type: String, required: true },
    compName: { type: String, required: true },
    set: { type: String, required: true },
    boardState: { type: [
        {
            hexId: { type: Number, required: true },
            hasUnit: { type: Boolean, required: true },
            unitId: { type: String },
            unitName: { type: String },
            unitCost: { type: Number },
            unitIcon: { type: String },
            unitTraits: { type: [String], default: undefined }
            // unitItems: {}
        }
    ], default: undefined, required: true },
    unitsOnBoard: { type: Map, of: Number, required: true},
    traits: { type: Map, of: Number, required: true}
});

module.exports = mongoose.model("TeamComp", teamCompSchema);