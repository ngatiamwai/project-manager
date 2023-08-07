const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const tokenVerfying=async(req,res,next)=>{
    try {
        const token=req.headers['token']
        if(!token){
            return res.status(401).json({message:'You are not allowed to be seeing This, provide a token'})
        }
        const decodedData=jwt.verify(token,process.env.SECRET)
        req.info = decodedData
        
    } catch (error) {
        res.json({Error:error})
    }
    next()
}

module.exports={
tokenVerfying
}