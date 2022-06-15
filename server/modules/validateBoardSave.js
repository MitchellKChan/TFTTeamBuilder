function validateBoardSave(boardState, unitsOnBoard, traits) {
    return isBoardStateValid(boardState) && areUnitsOnBoardValid(unitsOnBoard) && areTraitsValid(traits);
}

function isBoardStateValid(boardState) {
    let isBoardEmpty = true; // an empty board is invalid
    for (var i = 0; i < boardState.length; i++) {
        if (boardState[i].hasUnit) { // check each index of boardState to see if hasUnit is true
            isBoardEmpty = false; // if at least one index has a unit, change isBoardEmpty to false (valid board)
            break;
        }
    }
    return !isBoardEmpty;
}

function areUnitsOnBoardValid(unitsOnBoard) {
    return Object.keys(unitsOnBoard).length > 0;
}

function areTraitsValid(traits) {
    return Object.keys(traits).length > 0;
}

module.exports = validateBoardSave;