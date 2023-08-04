const mssql=require('mssql')
const {sqlConfig}=require('../../Config/config')

const createTableUser=async(req,res)=>{
    try {
        const table=`
        BEGIN 
TRY 
CREATE TABLE userTable(
    userId VARCHAR(100) PRIMARY KEY,
    userName VARCHAR(100) UNIQUE NOT NULL,
    userEmail VARCHAR(100) UNIQUE NOT NULL,
    userPhone VARCHAR (15) UNIQUE NOT NULL,
    userPassword VARCHAR(MAX) NOT NULL,
    profilePic VARCHAR (MAX),
    role VARCHAR (20) DEFAULT 'user' 
)
END TRY
BEGIN 
CATCH 
THROW 50001,'Table has already been created',1
END 
CATCH 
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