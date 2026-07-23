const { body } = require("express-validator");

const registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 }),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];


const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

module.exports = {
    registerValidation,
    loginValidation
};