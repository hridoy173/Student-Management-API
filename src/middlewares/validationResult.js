const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    console.dir(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: errors.mapped(),
            // errors: errors.array(),
        });
    }

    next();
};

module.exports = { validate };