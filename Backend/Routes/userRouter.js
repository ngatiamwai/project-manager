const {Router}=require('express')
const { registerUser, loginUser, updateUser, assignProject, viewAssignedProject, viewAllAssignedProjects, userCompleteProject, allusers } = require('../Controllers/userController')
const { tokenVerfying } = require('../MiddleWare/verifyToken')

const userRouter=Router()


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.put('/assign/:userId',tokenVerfying,assignProject)
userRouter.put('/update/:userId',tokenVerfying,updateUser)

userRouter.get('/:userId',tokenVerfying,viewAssignedProject)
userRouter.get('/',tokenVerfying,viewAllAssignedProjects)
userRouter.put('/complete/:userId',tokenVerfying,userCompleteProject)
userRouter.get('/all/users',allusers)



module.exports={
    userRouter
}