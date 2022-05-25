function genDummyBoard() {
    const initialBoard = [];

    // objects are pushed into initial board with their index as their hexId; 
    // hexId is used to index array when updating board
    for (var i = 0; i < 28; i++) {
        initialBoard.push({
            hexId: i,
            hasUnit: false,
            unitId: "",
            unitName: "",
            unitCost: "",
            unitIcon: "",
            unitTraits: ""
            // unitItems: {}
        });
    }

    initialBoard[3] = {
        ...initialBoard[3],
        hasUnit: true,
        unitId: "TFT5_Garen",
        unitName: "Garen",
        unitCost: 5,
        // unitIcon: null,
        unitTraits: [
            "Set5_Victorious",
            "Set5_Dawnbringer",
            "Set5_Knight"
        ]
    }
    return initialBoard;
}

exports.genDummyBoard = genDummyBoard;
// export default genDummyBoard;