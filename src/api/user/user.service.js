const users = require("../../dataBase/users");
const {promises: fs} = require("node:fs");
const path = require("node:path");

const currentDir = path.join(__dirname,"../../dataBase/");
const dataBaseFile = path.join(currentDir,"users.json");


module.exports = {
    getSingleUser: async (userId) => {
        const user = users[userId - 1];

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },
    postUser: async (reqBody)=>{
        let allUs = await  fs.readFile(dataBaseFile)
        let newUs = JSON.parse(allUs);
        newUs.push(reqBody)
        await fs.writeFile(dataBaseFile,JSON.stringify(newUs))
    },
    updUser: async  (userId,body) => {
        const id = userId - 1;
        if(users[userId - 1] === undefined){
            throw new Error("no user with this id")
            return;
        }
        let allUs = await  fs.readFile(dataBaseFile);
        let updUs = JSON.parse(allUs);
        updUs.splice(id,1,body)
        await fs.writeFile(dataBaseFile,JSON.stringify(updUs))
},
    dltUser: async  (userId)=> {
        const id = userId - 1;
        if(users[userId - 1] === undefined){
            throw new Error("no user with this id")
            return;
        }
        let allUs = await  fs.readFile(dataBaseFile);
        let delUs = JSON.parse(allUs);
        delUs.splice(id,1)
        await fs.writeFile(dataBaseFile,JSON.stringify(delUs))
    }
}