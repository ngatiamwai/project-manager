const {v4}=require('uuid')
const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const { sqlConfig } = require('../Config/config')
const { createTableUser } = require('../Database/Tables/createUserTable')

//ENDPOINT FOR USER REGISTRATION
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
        })
        .then((result)=>{
            
            res.json({
                message:'User Registered succesfully',
                result
            })
        }).catch((err)=>{
            console.log('Error') 
        })
    } catch (error) {
       // createTableUser()
        res.json({Error:error.message})
    }
}

//An Endpoint for UserLogin
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
console.log('alresdy here')
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
           .then((result)=>{
            return res.json({
                message:'User details Updated Successfully' })
             })
            
        }).catch((error)=>{
            res.json({Error:`You have an error ${error}`})
        })
    } catch (error) {
        return res.json({Error:error})
    }
}
module.exports={
    registerUser,
    loginUser,
    updateUser
}