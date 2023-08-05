const dotenv = require('dotenv')
dotenv.config()
const mssql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis:  30000 
    },
    options:{
        encrypt: false, 
        trustServerCertificate: false
    }
}



module.exports={
    sqlConfig
}