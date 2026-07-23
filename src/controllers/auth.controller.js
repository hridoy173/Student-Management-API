const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/auth.service");
const successResponse = require("../utils/successResponse");


// register controller function to handle user registration
const register = asyncHandler(async (req, res) => {

    const result = await authService.register(req.body);

    return successResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: result
    });

});


// login controller function to handle user login
const login = asyncHandler(async (req, res) => {

    const result = await authService.login(req.body);

    return successResponse(res, {
        statusCode: 200,
        message: "User logged in successfully",
        data: result
    });

});





module.exports = {
    register,
    login
};