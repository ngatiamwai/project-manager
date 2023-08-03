const {v4}=require('uuid')
const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const { sqlConfig } = require('../Config/config')
const { createTableUser } = require('../Database/Tables/createTables')

// USER REGISTRATION Controller
const registerUser=async(req,res)=>{
    try {
        const userId=v4()
        const {userName,userPhone,userEmail,userPassword}=req.body
        const salt = await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(userPassword, salt)

        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('userId',userId)
            .input('userName',userName)
            .input('userEmail',userEmail)
            .input('userPhone',userPhone)
            .input('userPassword',hashedPassword)
            .execute('registerUserProc')
           
        }).then((result)=>{
            res.json({message:'User Registered succesful',result})
        }).catch((err)=>{
            console.log('Error')
        })
    } catch (error) {
       
        res.json({Error:error.message})
    }
}

//USER LOGIN Controller
const loginUser=async(req,res)=>{
    try {
        const {userName,userPassword}=req.body 
       const pool=await mssql.connect(sqlConfig)
       const user=(await pool.request().input('userName',mssql.VarChar,userName).execute('userLoginProc')).recordset[0]

       const hashedPassword=user.userPassword

       if(user){
        const comparePassword=await bcrypt.compare(userPassword, hashedPassword)

        if(comparePassword){
            const {userPassword,...payload}=user 
            const token=jwt.sign(payload, process.env.SECRET,{expiresIn:'360000s'})
            return res.status(200).json({message:'Logged in successful',token })
                
           }else{
            return res.status(400).json({message:'Invalid Log in'})
           }
       }else{
        return res.status(400).json({message:'Wrong Log in Details'})
       }
    } catch (error) {
        res.json({Error:error})
    }
}

//USER UPDATE DETAILS ENDPOINT

const updateUser=async(req,res)=>{
    try {
        const {userId}=req.params 
        const {userName,userEmail,userPhone,userPassword,profilePic}=req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(userPassword, salt)
//console.log('already here')
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('userId',userId)
            .input('userName',userName)
            .input('userEmail',userEmail)
            .input('userPhone',userPhone)
            .input('userPassword',hashedPassword)
            .input('profilePic',profilePic)
           .execute('userUpdateProc')
           
            
    })
    } catch (error) {
        return res.json({Error:error})
    }
}

//ASSIGN a project 
const assignProject=async(req,res)=>{
    try {
        const {userName}=req.params 
        const {projectId}=req.body 
        if (req.user.role !== 'admin') {
              return res.status(403).json({ error: 'You do not have permission to assign projects' });
             }
          
        mssql.connect(sqlConfig)
.then((pool)=>{
    pool.request()
    mssql.query('UPDATE projectTable SET assignedTo = @userName WHERE projectId = @projectId', { userId, projectId }, (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error assigning project' });
          }
          return res.status(200).json({ message: 'Project assigned successfully' });
        });
})
 

    } catch (error) {
       

    }
}
module.exports={
    registerUser,
    loginUser,
    updateUser,
    assignProject
}