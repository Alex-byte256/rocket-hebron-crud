const users = require("../../dataBase/users.json");
const userService = require("./user.service");


module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },

    createUser: async (req, res) => {
        try {
            console.log(req.body);
            await userService.postUser(req.body);
            res.status(201).json('user created');
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

    updateUser: async (req, res) => {
        try {
            await  userService.updUser(req.params.userId,req.body)
            res.json('update user');
        }catch (e) {
            res.json(e);
        }


    },

    deleteUser: async (req, res) => {
        try {
            console.log(req.params.userId);
            await userService.dltUser(req.params.userId)
            res.json('delete user');
            res.status(204).json('User was deleted');
        }catch (e){
            res.json(e);
        }

    }
}