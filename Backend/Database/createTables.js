const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');


const createProjectsTable = async(req, res)=>{
    try {
        const table = `BEGIN
        TRY
            CREATE TABLE projectTable(
                projectId VARCHAR(200) PRIMARY KEY,
                projectName VARCHAR(500) NOT NULL,
                projectDescription VARCHAR(1000) NOT NULL,
                startDate DATE DEFAULT GETDATE(),
                endDate DATE NOT null,
                status BIT DEFAULT 0
            )
    
        END TRY
    BEGIN
        CATCH
            THROW 50001, 'Table already Exists!', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)//ensure connected to my database
    //code below just to run the query on database using here
    await pool.query(table, (err)=>{
        if(err instanceof mssql.RequestError){  //if error results from the mssql, print the message
            console.log({Error: err.message});
        }
        else{
            console.log('Table Created Successfully');
        }
    })

    } catch (error) {
        return res({Error: error})
    }
}

module.exports = {
    createProjectsTable
}