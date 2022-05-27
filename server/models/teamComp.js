const mongoose = require("mongoose");
const BoardHex = require("./boardHex");

const Schema = mongoose.Schema;

const teamCompSchema = new Schema({
    userId: { type: String, required: true },
    compName: { type: String, required: true },
    set: { type: String, required: true },
    boardState: { type: [BoardHex], default: undefined, required: true },
    unitsOnBoard: { type: Map, of: Number, required: true},
    traits: { type: Map, of: Number, required: true}
});

module.exports = mongoose.model("TeamComp", teamCompSchema);