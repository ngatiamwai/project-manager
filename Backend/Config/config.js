const mssql = require('mssql')
const dotenv = require('dotenv')//import dotenv and mssql,   npm i mssql,  npm i dotenv
dotenv.config()//use .env file

//copy paste from its documentations
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis:  30000   //disconnect from the database after 30 seconds
    },
    options:{
        encrypt: false,     //bcos i dont have a free azure acount
        trustServerCertificate: false
    }
}

mssql.connect(sqlConfig).then(pool=>{   //ensure if the database is connected
    if(pool.connected){
        console.log('connected to db');
    }
})
module.exports = {
    sqlConfig
}


