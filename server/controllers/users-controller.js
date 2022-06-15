const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

async function getAllUsers(req, res, next) {
    let users;
    try {
        users = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError("Fetching users failed, please try again.", 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
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
        const error = new HttpError("Fetching user failed, please try again.", 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError("User already exists, please login instead.", 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError("Password hashing failed, please try again.", 500);
        return next(error);
    }

    const createdUser = new User({
        username,
        email,
        password: hashedPassword,
        teamComps: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again.", 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email}, 
            "privateKey", 
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("Signing up failed (token), please try again.", 500);
        return next(error);
    }

    // res.status(201).json({ createdUser: createdUser.toObject({ getters: true }), token: token });
    res.status(201).json({
        username: createdUser.username,
        userId: createdUser.id,
        email: createdUser.email,
        token: token
    });
}

async function login(req, res, next) {
    const {email, password} = req.body;

    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Fetching user failed, please try again.", 500);
        return next(error);
    }

    if (!identifiedUser) {
        const error = new HttpError("Invalid credentials, could not log you in.", 403);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    } catch (err) {
        const error = new HttpError("Could not log you in, please check your credentials and try again.", 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError("Invalid credentials, could not log you in.", 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: identifiedUser.id, email: identifiedUser.email, username: identifiedUser.username}, 
            "privateKey", 
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("Logging in failed, please try again.", 500);
        return next(error);
    }

    res.json({
        username: identifiedUser.username,
        userId: identifiedUser.id,
        email: identifiedUser.email,
        token: token
    });
}

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;