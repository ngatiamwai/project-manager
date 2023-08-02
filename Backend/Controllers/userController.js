const {v4}=require('uuid')
const mssql=require('mssql')
const bcrypt=require('bcrypt')

const { sqlConfig } = require('../Config/config')
const { createTableUser } = require('../Database/Tables/createTables')

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
                message:'User Registered succsfully',
                result
            })
        }).catch((err)=>{
            console.log('Error') 
        })
    } catch (error) {
        createTableUser()
        res.json({Error:error.message})
    }
}
module.exports={
    registerUser
}