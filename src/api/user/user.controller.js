const users = require("../../dataBase/users");
const userService = require("./user.service");

module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },

    createUser: (req, res) => {
        try {
            console.log(req.body);

            res.status(201).json('HELLO TEST CHAT');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            console.log(req.params);

            const user = await userService.getSingleUser(req.params.userId);

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: (req, res) => {
        console.log(req.body);
        console.log(req.params.userId);

        res.json('HELLO TEST CHAT');
    },

    deleteUser: (req, res) => {
        console.log(req.params.userId);

        res.status(204).json('User was deleted');
    }
}