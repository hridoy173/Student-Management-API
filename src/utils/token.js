const jwt = require("jsonwebtoken");

// a function to generate a token using JWT
const generateToken = (
    payload,
    secret,
    expiresIn
) => {

    return jwt.sign(
        payload,
        secret,
        { expiresIn }
    );

};

// a function to generate an access token using JWT
const generateAccessToken = (payload) => {

   return generateToken(
        payload,
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN
    );

};


// a function to generate a refresh token using JWT
const generateRefreshToken = (payload) => {

    return generateToken(
        payload,
        process.env.JWT_REFRESH_SECRET,
        process.env.JWT_REFRESH_EXPIRES
    );

};


// a function to verify a token using JWT
const verifyToken = (token, secret) => {

    return jwt.verify(token, secret);

};




module.exports = {

    generateAccessToken,

    generateRefreshToken,

    verifyToken

};