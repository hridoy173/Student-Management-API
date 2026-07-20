const User = require("../models/userModel");

class UserRepository {

    async findAll() {
        return await User.find();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(payload) {
        return await User.create(payload);
    }

    async update(id, payload) {
        return await User.findByIdAndUpdate(
            id,
            payload,
            { new: true }
        );
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

}

module.exports = new UserRepository();