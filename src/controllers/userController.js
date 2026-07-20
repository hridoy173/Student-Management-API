const userService = require("../services/userService");
const asyncHandler = require("../middlewares/asyncHandler");
const successResponse = require("../utils/successResponse");


const getUsers = asyncHandler(async (req, res) => {

    const users = await userService.getUsers();

    return successResponse(res, {

        message: "Users fetched successfully",
        data: users

    });

});




module.exports = {
    getUsers
};