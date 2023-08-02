const {Router}=require('express')
const { registerUser } = require('../Controllers/userController')

const userRouter=Router()

userRouter.post('/',registerUser)

module.exports={
    userRouter
}