const userRepository = require("../repositories/userRepository");

class UserService {

    async getUsers() {

        return await userRepository.findAll();

    }

}

module.exports = new UserService();