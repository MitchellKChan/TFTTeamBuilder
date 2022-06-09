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
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed, please try again.", 401);
        return next(error);
    }
    
}