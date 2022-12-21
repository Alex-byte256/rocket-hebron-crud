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
            let allUs = await  fs.readFile(dataBaseFile)
            let newUs = JSON.parse(allUs);
            newUs.push(req.body)
            await fs.writeFile(dataBaseFile,JSON.stringify(newUs))
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
            const id = req.params.userId - 1;
            if(users[req.params.userId - 1] === undefined){
                throw new Error("no user with this id")
                return;
            }
            let allUs = await  fs.readFile(dataBaseFile);
            let updUs = JSON.parse(allUs);
            updUs.splice(id,1,req.body)
            await fs.writeFile(dataBaseFile,JSON.stringify(updUs))
            res.json('update user');
        }catch (e) {
            console.log(e);
        }


    },

    deleteUser: async (req, res) => {
        try {
            console.log(req.params.userId);
            const id = req.params.userId - 1;
            if(users[req.params.userId - 1] === undefined){
                throw new Error("no user with this id")
                return;
            }
            let allUs = await  fs.readFile(dataBaseFile);
            let delUs = JSON.parse(allUs);
            delUs.splice(id,1)
            await fs.writeFile(dataBaseFile,JSON.stringify(delUs))
            res.json('delete user');
            res.status(204).json('User was deleted');
        }catch (e){
            console.log(e);
        }



    }
}