const mssql=require('mssql')
const {sqlConfig}=require('../../Config/config')

const createTableUser=async(req,res)=>{
    try {
        const table=`
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3MjJjNzdhLWU4MmEtNDI3Zi1iZmE4LWY5NDZhMjlmNTM3NCIsInVzZXJuYW1lIjoiTXVueWlyaSBNIiwiZW1haWwiOiJtdW55aXJpLm13YW5naS5jb20iLCJyb2xlIjoidXNlciIsImlzc2VudCI6ZmFsc2UsImlhdCI6MTY5MDk2NjI1NywiZXhwIjoxNjkxMDAyMjU3fQ.h3C14_v5qiReKT2sNqjKRxqt9WAg7ZK-yC-aV_HxITg
        `
        const pool=await mssql.connect(sqlConfig)
await pool.query(table,(err)=>{
    if(err instanceof mssql.RequestError){
        console.log({Error:err.message})
    }else{
        console.log('UserTable Created as success')
    }
})
    } catch (error) {
        return  res.json({Error:error})
    }
}
module.exports={
   createTableUser, 
}