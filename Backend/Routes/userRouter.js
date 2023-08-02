const {Router}=require('express')
const { registerUser, loginUser, updateUser } = require('../Controllers/userController')
const { tokenVerfying } = require('../MiddleWare/verifyToken')

const userRouter=Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/:userId',updateUser)

module.exports={
    userRouter
}