const {validationResult} = require("express-validator");

const genEmptyBoard = require("../modules/genEmptyBoard");
const TeamComp = require("../models/teamComp");

const HttpError = require("../models/http-error");

async function getTeamCompById(req, res, next) {
    const id = req.params.id;
    if (id === "0") return res.json({ teamComp: genEmptyBoard() });

    let teamComp;
    try {
        teamComp = await TeamComp.findById(id);
    } catch (err) {
        const error = new HttpError("Fetching team composition failed, please try again.", 500);
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

    const { userId, compName, set, boardState, unitsOnBoard, traits } = req.body;

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
        const error = new HttpError("Creating team composition failed, please try again.", 500);
        return next(error);
    }

    res.status(201).json({teamComp: createdTeamComp});
}

async function updateTeamComp(req, res, next) {
    const { compName, boardState, unitsOnBoard, traits } = req.body;
    const id = req.params.id;

    let updatedTeamComp;
    try {
        updatedTeamComp = await TeamComp.findById(id);
    } catch (err) {
        const error = new HttpError("Fetching team composition failed, please try again.", 500);
        return next(error);
    }

    updatedTeamComp.compName = compName;
    updatedTeamComp.boardState = boardState,
    updatedTeamComp.unitsOnBoard = new Map(Object.entries(unitsOnBoard));
    updatedTeamComp.traits = new Map(Object.entries(traits));

    try {
        updatedTeamComp.save();
    } catch (err) {
        const error = new HttpError("Could not update team composition, please try again.", 500);
        return next(error);
    }

    res.status(200).json({ teamComp: updatedTeamComp.toObject({ getters: true }) });


}

async function deleteTeamComp(req, res, next) {
    const id = req.params.id;

    let teamComp;
    try {
        teamComp = await TeamComp.findById(id);
    } catch (err) {
        const error = new HttpError("Fetching team composition failed, please try again.", 500);
        return next(error);
    }

    try {
        await teamComp.remove();
    } catch (err) {
        const error = new HttpError("Could not delete team composition, please try again.", 500);
        return next(error);
    }

    res.status(200).json({message: `Team comp with id ${id} is now deleted.`});
}

exports.createTeamComp = createTeamComp;
exports.getTeamCompById = getTeamCompById;
exports.getTeamCompsByUserId = getTeamCompsByUserId;
exports.updateTeamComp = updateTeamComp;
exports.deleteTeamComp = deleteTeamComp;