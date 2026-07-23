const ApiError = require("../errors/ApiError");
const userRepository = require("../repositories/user.repository");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");


// Service class for authentication-related operations
class AuthService {


    // Method to register a new user
    async register(payload) {

        const existingUser = await userRepository.findByEmail(payload.email);

        if (existingUser) {
            throw new ApiError(409,"Email already exists");
        }

        const user = await userRepository.create(payload);

        const accessToken =  generateAccessToken({
                id: user._id,
                role: user.role
            });

        const refreshToken =  generateRefreshToken({
                id: user._id
            });


        return {
            user,
            accessToken,
            refreshToken

        };

    }



    // Method to log in an existing user
    async login(payload) {

        const { email, password } = payload;
        const user = await userRepository.findByEmail(email, true);

        if (!user) {
            throw new ApiError(404, "Invalid email or password");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }

        user.lastLogin = new Date();
        await user.save();

        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role
        });

        const refreshToken = generateRefreshToken({
            id: user._id
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        };
    }



    
}   



module.exports = new AuthService();