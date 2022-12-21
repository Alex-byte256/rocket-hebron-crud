const userRouter = require('express').Router();

const controller = require('./user.controller');

userRouter.get('/', controller.getAllUsers);
userRouter.post('/', controller.createUser);

userRouter.get('/:userId', controller.getUserById);
userRouter.put('/:userId', controller.updateUser);
userRouter.delete('/:userId', controller.deleteUser);


module.exports = userRouter;