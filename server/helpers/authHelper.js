import jwt  from "jsonwebtoken";
import {authJwt} from "../config/keys.js";

function generateBaererToken(id){
    const payload = {
        id
    };
    const secret = authJwt.secret;
    const options = { expiresIn: authJwt.tokens.bearer.expiresIn};
    return jwt.sign(payload, secret, options);
};

function generateRefreshToken(){
    const payload = {
    };
    const secret = authJwt.secret;
    const options = { expiresIn: authJwt.tokens.refresh.expiresIn};
    return jwt.sign(payload, secret, options);
};

function validareToken(token){
    try {
    return jwt.verify(token, authJwt.secret);
    } catch (err) {
        return null;
    }
}

function payloadToken(token) {
    return jwt.verify(token, authJwt.secret);
}

export {
    generateBaererToken,
    generateRefreshToken,
    payloadToken,
    validareToken
};