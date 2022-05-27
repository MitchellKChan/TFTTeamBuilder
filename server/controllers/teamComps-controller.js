const {v4: uuidv4} = require("uuid");
const {validationResult} = require("express-validator");

const genDummyBoard = require("../modules/genDummyBoard");
const TeamComp = require("../models/teamComp");

const HttpError = require("../models/http-error");

let STARTER_TEAMCOMPS = [
    {
        id: "0",
        userId: "u1",
        compName: "Only Garen",
        set: "Set5",
        boardState: genDummyBoard.genDummyBoard(),
        unitsOnBoard: {
            "Garen": 1
        },
        traits: {
            "Set5_Victorious": 1,
            "Set5_Dawnbringer": 1,
            "Set5_Knight": 1
        }
    }
];

async function getTeamCompById(req, res, next) {
    const id = req.params.id;

    let teamComp;
    try {
        teamComp = await TeamComp.findById(id);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find a team composition.", 500);
        return next(error);
    }

    if (!teamComp) {
        const error = new HttpError("Could not find a team composition with the provided id.", 404)
        return next(error);
    }

    res.json({ teamComp: teamComp.toObject({ getters: true }) });
}

async function getTeamCompsByUserId(req, res, next) {
    const userId = req.params.userId;

    let teamComps;
    try {
        teamComps = await TeamComp.find({ userId: userId });
    } catch (err) {
        const error = new HttpError("Fetching team compositions failed, please try again.", 500);
        return next(error);
    } 

    if (!teamComps || teamComps.length === 0) {
        const error = new HttpError("Could not find a team composition with the provided username.", 404);
        return next(error);
    }

    res.json({ teamComps: teamComps.map(teamComp => teamComp.toObject({ getters: true })) });

}

async function createTeamComp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        ); 
    }

    const {userId, compName, set, boardState, unitsOnBoard, traits} = req.body;

    const createdTeamComp = new TeamComp({
        userId,
        compName,
        set,
        boardState,
        unitsOnBoard: new Map(Object.entries(unitsOnBoard)),
        traits: new Map(Object.entries(traits))
    });

    try {
        await createdTeamComp.save();
    } catch (err) {
        const error = new HttpError("Creating team comp failed, please try again.", 500);
        return next(error);
    }

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