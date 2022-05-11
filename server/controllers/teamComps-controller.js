const {v4: uuidv4} = require("uuid");
const {validationResult} = require("express-validator");

const genDummyBoard = require("../modules/genDummyBoard");

const HttpError = require("../models/http-error");

let STARTER_TEAMCOMPS = [
    {
        id: "0",
        boardState: genDummyBoard.genDummyBoard(),
        unitsOnBoard: {
            "Garen": 1
        },
        traits: {
            "Set5_Victorious": 1,
            "Set5_Dawnbringer": 1,
            "Set5_Knight": 1
        },
        userId: "me"
    }
];

function getTeamCompById(req, res, next) {
    const id = req.params.id;
    const teamComp = STARTER_TEAMCOMPS.find(tc => {
        return tc.id === id;
    });

    if (!teamComp) {
        throw new HttpError("Could not find a team composition with the provided id.", 404);
    }

    res.json({teamComp});
}

function getTeamCompsByUserId(req, res, next) {
    const userId = req.params.userId;
    const teamComps = STARTER_TEAMCOMPS.filter(tc => {
        return tc.userId === userId;
    });

    if (!teamComps || teamComps.length === 0) {
        throw new HttpError("Could not find a team composition with the provided userId.", 404);
    }

    res.json({teamComps});

}

function createTeamComp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }

    const {boardState, unitsOnBoard, traits, userId} = req.body;
    const createdTeamComp = {
        id: uuidv4(),
        boardState,
        unitsOnBoard,
        traits,
        userId
    };

    STARTER_TEAMCOMPS.push(createdTeamComp);

    res.status(201).json({teamComp: createdTeamComp});
}

function updateTeamComp(req, res, next) {
    const {boardState, unitsOnBoard, traits} = req.body;
    const id = req.params.id;

    const updatedTeamComp = {
        ...STARTER_TEAMCOMPS.find(teamComp => teamComp.id === id),
        boardState: boardState,
        unitsOnBoard: unitsOnBoard,
        traits: traits
    };

    const teamCompIndex = STARTER_TEAMCOMPS.findIndex(teamComp => teamComp.id === id);

    STARTER_TEAMCOMPS[teamCompIndex] = updatedTeamComp;

    res.status(200).json({teamComp: updatedTeamComp});


}

function deleteTeamComp(req, res, next) {
    const id = req.params.id;
    if (!STARTER_TEAMCOMPS.find(teamComp => teamComp.id === id)) {
        throw new HttpError("Could not a team comp with that id.", 404);
    }
    STARTER_TEAMCOMPS = STARTER_TEAMCOMPS.filter(teamComp => teamComp.id != id);
    res.status(200).json({message: `Team comp with id ${id} is now deleted.`});
}

exports.createTeamComp = createTeamComp;
exports.getTeamCompById = getTeamCompById;
exports.getTeamCompsByUserId = getTeamCompsByUserId;
exports.updateTeamComp = updateTeamComp;
exports.deleteTeamComp = deleteTeamComp;