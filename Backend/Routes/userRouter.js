const {Router}=require('express')
const { registerUser, loginUser, updateUser, assignProject } = require('../Controllers/userController')
const { tokenVerfying } = require('../MiddleWare/verifyToken')

const userRouter=Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/:userId',updateUser)
userRouter.put('/assign/userName',assignProject)

module.exports={
    userRouter
}