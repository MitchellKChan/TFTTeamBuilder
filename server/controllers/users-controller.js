const { validationResult } = require("express-validator");
const {v4: uuidv4} = require("uuid");

const HttpError = require("../models/http-error");
const User = require("../models/user");

async function getUsers(req, res, next) {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError("Fetching users failed, please try again.", 500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
}

async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid inputs passed, please check your data.", 422);
        return next(error);
    }
    const {username, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again.", 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError("User already exists, please login instead.", 422);
        return next(error);
    }

    const createdUser = new User({
        username,
        email,
        password // TODO: store encrypted password later on
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again.", 500);
        return next(error);
    }


    res.status(201).json({user: createdUser.toObject({ getters: true })});
}

async function login(req, res, next) {
    const {email, password} = req.body;

    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again.", 500);
        return next(error);
    }

    if (!identifiedUser || identifiedUser.password !== password) {
        const error = new HttpError("Invalid credentials, could not log you in.", 401);
        return next(error);
    }

    res.json({message: "Logged in successfully!"});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;