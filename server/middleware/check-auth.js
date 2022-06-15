const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // AuthorizationZ: "Bearer TOKEN"
        if (!token) {
            throw new Error("Authentication failed, please try again.");
        }
        const decodedToken = jwt.verify(token, "privateKey");
        req.userData = { userId: decodedToken.userId, username: decodedToken.username };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed, please try again.", 403);
        return next(error);
    }
    
}