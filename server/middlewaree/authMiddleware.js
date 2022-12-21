import jwt from "jsonwebtoken";
import {authJwt} from "../config/keys.js";

export function authMiddleware (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
        let token = req.headers.authorization;
        if (!token || token === undefined) {
            return res.status(403).json({message: "The user is not authorized"});
        }
        token = token.split(' ')[1];
        try {
            const decodedData = jwt.verify(token, authJwt.secret);
            req.user = decodedData;
        } catch (err) {
            return res.status(403).json({message: "The user is not authorized"});
        }
        
        next()
};