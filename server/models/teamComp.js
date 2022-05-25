const mongoose = require("mongoose");
const BoardHex = require("./boardHex");

const Schema = mongoose.Schema;

const teamCompSchema = new Schema({
    userId: { type: String, required: true },
    compName: { type: String, required: true },
    set: { type: String, required: true },
    boardState: { any: Object }
    // boardState: { type: [{
    //     hexId: { type: Number, required: true },
    //     hasUnit: { type: Boolean, required: true },
    //     unitId: { type: String, required: true },
    //     unitName: { type: String, required: true },
    //     unitCost: { type: Number, required: true },
    //     unitIcon: { type: String, required: true },
    //     unitTraits: { type: [String], required: true }
    // }]}
    // unitsOnBoard: { type: Map, of: Number, required: true},
    // traits: { type: Map, of: Number, required: true}
});

module.exports = mongoose.model("TeamComp", teamCompSchema);