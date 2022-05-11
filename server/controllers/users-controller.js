const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const {v4: uuidv4} = require("uuid");


let STARTER_USERS = [
    {
        id: "u1",
        name: "starterUser",
        email: "test@test.com",
        password: "starter"
    }
];

function getUsers(req, res, next) {
    res.json({users: STARTER_USERS});
}

function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const {name, email, password} = req.body;

    const existingUser = STARTER_USERS.find(user => user.email === email);

    if (existingUser) {
        throw new HttpError("Could not create user, email already exists.", 422);
    }

    const createdUser = {
        id: uuidv4(),
        name, // name: name
        email,
        password
    };

    STARTER_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
}

function login(req, res, next) {
    const {email, password} = req.body;
    const identifiedUser = STARTER_USERS.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user, incorrect credentials were entered.", 401);
    }

    res.json({message: "Logged in successfully!"});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;