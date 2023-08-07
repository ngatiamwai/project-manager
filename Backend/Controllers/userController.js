const {v4}=require('uuid')
const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const { sqlConfig } = require('../Config/config')
const { createProjectsTable, createTableUser } = require('../Database/Tables/createTables')
const { userRegisterValidator, loginValidator, userUpdateValidator } = require('../Validators/userValidator')



// USER REGISTRATION Controller
const registerUser=async(req,res)=>{
    try {
        createTableUser()
        const userId=v4()

        const {userName,userPhone,userEmail,userPassword}=req.body

        const {error}=userRegisterValidator.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(userPassword, salt)


        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            const result = (await pool.request()
            .input('userId',userId)
            .input('userName',userName)
            .input('userEmail',userEmail)
            .input('userPhone',userPhone)
            .input('userPassword',hashedPassword)
            .execute('registerUserProc'))
            if(result.rowsAffected[0]==1){
                return res.status(200).json({message:"User Registered Succesful"})

            }else{

                return res.status(400).json({message:"Error Registering User"})
            }
        }else{
            return res.json({message: 'pool not connected'})
        }   
        

    } catch (error) {
       
       return res.json({Error: error.message})
    }
}

const allusers = async(req,res)=>{
try {
    const pool=await mssql.connect(sqlConfig)
    const users = (await pool.request().execute('getAllUsersProc')).recordset 
    res.json({allUsers: users})
} catch (error) {
    return res.json({error})
}
}

//USER LOGIN Controller
const loginUser=async(req,res)=>{
    try {
        const {userName,userPassword,role}=req.body 
        const {error}=loginValidator.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
       const pool=await mssql.connect(sqlConfig)
       const user=(await pool.request().input('userName',mssql.VarChar,userName).execute('userLoginProc')).recordset[0]
       const hashedPassword=user.userPassword

       
       if(user){
        const comparePassword=await bcrypt.compare(userPassword, hashedPassword)

        if(comparePassword){
            const {userPassword,role,...payload}=user 
            const token=jwt.sign(payload, process.env.SECRET,{expiresIn:'360000s'})
            return res.status(200).json({message:'Logged in successful',token:token,role })
                
           }else{
            return res.status(400).json({message:'Invalid Log in'})
           }
       }else{
        return res.status(400).json({message:'Wrong Log in Details'})
       }
    } catch (error) {
        res.json({message:'Wrong Log in Details'})
    }
}

//USER UPDATE DETAILS ENDPOINT

const updateUser=async(req,res)=>{
    try {
        const {userId}=req.params 
        const {userName,userEmail,userPhone,userPassword,profilePic}=req.body
        
        const {error}=userUpdateValidator.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(userPassword, salt)
        
        const pool =await  mssql.connect(sqlConfig)
        if(pool.connected){
            const result=(await pool.request()
            .input('userId',userId)
            .input('userName',userName)
            .input('userEmail',userEmail)
            .input('userPhone',userPhone)
            .input('userPassword',hashedPassword)
            .input('profilePic',profilePic)
           .execute('userUpdateProc'))

           if(result.rowsAffected[0]==1){
            return res.json({message: "Details updated succsessfully"})
           }else{
            return res.json({error: "Details not  updated"})
           }
        }
        
    } catch (error) {
        return res.json({Error:error})
    }
}

//ASSIGN a project 
const assignProject=async(req,res)=>{
    try {
        
        const {userId}=req.params 

        const {projectId,assigned}=req.body 
        
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('projectId',projectId)
            .input('userId',userId)
            .input('assigned',assigned)
            .execute('assignProjectProc')
            .then((result)=>{
                res.status(200).json({message:'Project assigned success'})
            })
        }).catch((err)=>{
            console.log('Error assigning project')
            createProjectsTable()
        })
    } catch (error) {    
return res.json({Error:error})
    }
}

//VIEW ASSIGNED PROJECT
const viewAssignedProject=async(req,res)=>{
    try {
        const {userId}=req.params 
     const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request().input('userId',userId).execute('viewAssignedProjectProc')).recordset[0] 
        if(result){
return res.status(200).json({message:'Here is your project',result})
        }
        else{
           return res.status(400).json({message:'Project not found'})
        }
       
    } catch (error) {
        return res.json({Error:error})
    }
}

//ADMIN VIEW ALL ASSIGNED PROJECTS 
const viewAllAssignedProjects=async(req,res)=>{
    try {
        
        const {assigned}=req.params
        const pool=await (mssql.connect(sqlConfig))
        
        const projectsAssigned=(await pool.request().input('assigned',assigned).execute('viewAllAssignedProjectsProc')).recordsets
        res.json({projects:projectsAssigned})
    } catch (error) {
        return res.json({Error:error})
    }
}

//user complete a project
const userCompleteProject = async(req,res)=>{
    try {
        const userId = req.params.userId
        const {projectId} = req.body



        const pool=await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('userId', mssql.VarChar, userId)
        .input('projectId', mssql.VarChar, projectId)
        .execute('completeProject'))
        
        if(result.rowsAffected==1){  
            return res.json({
                message: "Project marked as completed",result})}
        else{
                return res.json({message: "Update failed, kindly ensure you have input the correct credentials"})
            }


    } catch (error) {
        return res.json({error})
    }
}
const checkUser = async(req,res)=>{
    if(req.info){
        res.json({
            userName: req.info.userName,
            userEmail: req.info.userEmail,
            userPhone: req.info.userPhone,
            profilePic: req.info.profilePic,
            role: req.info.role
        })
    }
}


module.exports={
    registerUser,
    loginUser,
    updateUser,
    assignProject,
    viewAssignedProject,
    viewAllAssignedProjects,
    userCompleteProject,
    allusers,
    checkUser
}

