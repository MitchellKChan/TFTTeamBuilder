function genEmptyBoard() {
    const initialBoard = [];

    // objects are pushed into initial board with their index as their hexId; 
    // hexId is used to index array when updating board
    for (var i = 0; i < 28; i++) {
        initialBoard.push({
            hexId: i,
            hasUnit: false,
            unitId: null,
            unitName: null,
            unitCost: null,
            unitIcon: null,
            unitTraits: null,
            unitItems: null
        });
    }
    return initialBoard;
}

export default genEmptyBoard;