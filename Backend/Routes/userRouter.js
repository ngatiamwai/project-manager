const {Router}=require('express')
const { registerUser, loginUser, updateUser, assignProject, viewAssignedProject, viewAllAssignedProjects, userCompleteProject, checkUser } = require('../Controllers/userController')
const { tokenVerfying } = require('../MiddleWare/verifyToken')

const userRouter=Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/:userId',tokenVerfying,updateUser)
userRouter.put('/assign/:userId',tokenVerfying,assignProject)
userRouter.get('/:userId',tokenVerfying,viewAssignedProject)
userRouter.get('/',tokenVerfying,viewAllAssignedProjects)
userRouter.put('/:complete/:userId',tokenVerfying,userCompleteProject)
userRouter.get('/checking',checkUser)


module.exports={
    userRouter
}