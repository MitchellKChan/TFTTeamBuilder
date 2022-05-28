function genEmptyBoard() {
    const boardState = [];

    // objects are pushed into initial board with their index as their hexId; 
    // hexId is used to index array when updating board
    for (var i = 0; i < 28; i++) {
        boardState.push({
            hexId: i,
            hasUnit: false,
            unitId: "",
            unitName: "",
            unitCost: null,
            unitIcon: "",
            unitTraits: [],
            unitItems: {}
        });
    }

    // boardState[3] = {
    //     ...boardState[3],
    //     hasUnit: true,
    //     unitId: "TFT5_Garen",
    //     unitName: "Garen",
    //     unitCost: 5,
    //     unitIcon: "",
    //     unitTraits: [
    //         "Set5_Victorious",
    //         "Set5_Dawnbringer",
    //         "Set5_Knight"
    //     ]
    // }
    // return initialBoard;
    return ({
        id: "0",
        userId: "TFTTeamBuilder",
        compName: "Empty Board",
        set: "Set",
        boardState: boardState,
        unitsOnBoard: {},
        traits: {}
    });
}

module.exports = genEmptyBoard;
// export default genDummyBoard;