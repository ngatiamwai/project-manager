const {Router}=require('express')
const { registerUser, loginUser, updateUser, assignProject, viewAssignedProject, viewAllAssignedProjects } = require('../Controllers/userController')
const { tokenVerfying } = require('../MiddleWare/verifyToken')

const userRouter=Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/:userId',updateUser)
userRouter.put('/assign/:userId',assignProject)
userRouter.get('/:userId',viewAssignedProject)
userRouter.post('/',viewAllAssignedProjects)

module.exports={
    userRouter
}