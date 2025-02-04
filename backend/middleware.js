const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

function userMiddleware (req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_SECRET);

    if (decoded) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json ({
            message :"You are not signed in!"
        })
    }
}

function authMiddleware (req, res, next) {
    const updateBody = z.object({
        fisrtName: z.string().min(3).max(20).optional(),
        lastName: z.string().min(3).max(20).optional(),
        password: z.string().min(3).max(20).optional(),
    })
}

 module.exports = {
    userMiddleware,
    authMiddleware,
 } 