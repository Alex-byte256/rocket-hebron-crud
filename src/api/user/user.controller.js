const users = require("../../dataBase/users.json");
const userService = require("./user.service");
const fs =  require("node:fs").promises;
const path =require("node:path")

const currentDir = path.join(__dirname,"../../dataBase/");
const dataBaseFile = path.join(currentDir,"users.json");

module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },

    createUser: async (req, res) => {
        try {
            console.log(req.body);
            let el = await  fs.readFile(dataBaseFile)
            let newUs = JSON.parse(el);
            newUs.push(req.body)
            await fs.writeFile(dataBaseFile,JSON.stringify(newUs))
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