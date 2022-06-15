const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const genEmptyBoard = require("../modules/genEmptyBoard");
const validateBoardSave = require("../modules/validateBoardSave");
const TeamComp = require("../models/teamComp");
const User = require("../models/user");

const HttpError = require("../models/http-error");

async function getAllTeamComps(req, res, next) {
    let teamComps;
    try {
        teamComps = await TeamComp.find({});
    } catch (err) {
        const error = new HttpError("Fetching team compositions failed, please try again.", 500);
        return next(error);
    }
    res.json({
        teamCompsMapped: teamComps.map(teamComp => teamComp.toObject({ getters: true })), // issue: return empty objects for unitsOnBoard and traits on frontend
        teamComps // issue: causes unique "key" warning when rendering TeamCompItem on frontend
    });
    
}

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

    res.json({ 
        teamCompMapped: teamComp.toObject({ getters: true }), 
        teamComp
    });
}

async function getTeamCompsByUserId(req, res, next) {
    const creator = req.params.creator;

    let userTeamComps;
    try {
        userTeamComps = await User.findOne({ username: creator }).populate("teamComps");
    } catch (err) {
        const error = new HttpError("Fetching team compositions failed, please try again.", 500);
        return next(error);
    } 

    if (!userTeamComps || userTeamComps.teamComps.length === 0) {
        const error = new HttpError("Could not find team compositions for the provided userId.", 404);
        return next(error);
    }

    res.json({ 
        teamCompsMapped: userTeamComps.teamComps.map(teamComp => teamComp.toObject({ getters: true })),
        teamComps: userTeamComps.teamComps
    });

}

async function createTeamComp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        ); 
    }

    const { compName, set, boardState, unitsOnBoard, traits } = req.body;

    if (!validateBoardSave(boardState, unitsOnBoard, traits)) {
        const error = new HttpError("Saved team compositions require at least one unit; please add a unit to the board and try again.", 500);
        return next(error);
    }

    const createdTeamComp = new TeamComp({
        userId: req.userData.userId,
        creator: req.userData.username,
        compName,
        set,
        boardState,
        unitsOnBoard: new Map(Object.entries(unitsOnBoard)),
        traits: new Map(Object.entries(traits))
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError("Fetching user failed; please try again", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError("Could not find user for provided id; please try again", 404);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdTeamComp.save({ session }); // { session } => { session: session }
        user.teamComps.push(createdTeamComp); // add TeamComp id to teamComps array of user
        await user.save({ session });
        await session.commitTransaction();

    } catch (err) {
        const error = new HttpError("Creating team composition failed, please try again.", 500);
        return next(error);
    }

    res.status(201).json({ id: createdTeamComp.id, creator: createdTeamComp.creator });
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

    if (updatedTeamComp.userId.toString() !== req.userData.userId) {
        const error = new HttpError("You are not allowed to update this team composition.", 401);
        return next(error);
    }

    if (!validateBoardSave(boardState, unitsOnBoard, traits)) {
        const error = new HttpError("Updated team compositions require at least one unit; please add a unit to the board and try again.", 500);
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
        teamComp = await TeamComp.findById(id).populate("userId"); // identify property in User record to update
    } catch (err) {
        const error = new HttpError("Fetching team composition failed, please try again.", 500);
        return next(error);
    }

    if (!teamComp) {
        const error = new HttpError("Could not find team composition for provided id; please try again.", 404);
        return next(error);
    }

    if (teamComp.userId.id !== req.userData.userId) {
        const error = new HttpError("You are not allowed to delete this team composition.", 401);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await teamComp.remove({ session }); // { session } => { session: session }
        teamComp.userId.teamComps.pull(teamComp);
        await teamComp.userId.save({ session });
        await session.commitTransaction();
    } catch (err) {
        const error = new HttpError("Could not delete team composition, please try again.", 500);
        return next(error);
    }

    res.status(200).json({message: `Team comp with id ${id} is now deleted.`});
}

exports.getAllTeamComps = getAllTeamComps
exports.createTeamComp = createTeamComp;
exports.getTeamCompById = getTeamCompById;
exports.getTeamCompsByUserId = getTeamCompsByUserId;
exports.updateTeamComp = updateTeamComp;
exports.deleteTeamComp = deleteTeamComp;