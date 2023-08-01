const {v4} = require('uuid')
const mssql = require('mssql')
const { createProjectsTable } = require('../Database/createTables')
const { sqlConfig } = require('../Config/config')

const createProject = async(req,res)=>{
try {
    const projectId = v4()
    const {projectName,projectDescription,endDate} = req.body

    const pool = await mssql.connect(sqlConfig)
    if(pool.connected){
        const result = await pool.request()
        .input('projectId', mssql.VarChar, projectId)
        .input('projectName', mssql.VarChar, projectName)
        .input('projectDescription', mssql.VarChar, projectDescription)
        .input('endDate', mssql.Date, endDate)
        
        .execute('addProjectPROC')
        
         if(result.rowsAffected==1){  
         return res.json({
             message: "Project created Succesfully",
         })}
         else{
             return res.json({message: "Creation failed"})
         }
 
     }else{
        return res.json({message: "database not connected"})
     }
    
} catch (error) {
    createProjectsTable()
    return res.json({message: "did not find the table click again because the table will be created"})
}   }

const deleteProject= async(req,res)=>{
    try {
        const projectId = req.params.projectId

        const pool = await (mssql.connect(sqlConfig))

        const result = await pool.request()
        .input('projectId', projectId)
        .execute('deleteProject')

        if (result.rowsAffected==1){
            return res.json({
                message: 'deleted successfully'
            })
        }
        else{
            return res.json({
                message: 'Project not found'
            })
        } 
    } catch (error) {
        
    }
}




module.exports = {
    createProject,
    deleteProject
}