const {v4} = require('uuid')
const mssql = require('mssql')

const { sqlConfig } = require('../Config/config')
const { createProjectsTable, createTableUser } = require('../Database/Tables/createTables')

const createProject = async(req,res)=>{
try {
    // createTableUser()
    // createProjectsTable()
    const projectId = v4()
    const {projectName,projectDescription,endDate} = req.body
    const pool = await mssql.connect(sqlConfig)
    
        const result = await pool.request()
        .input('projectId', mssql.VarChar, projectId)
        .input('projectName', mssql.VarChar, projectName)
        .input('projectDescription', mssql.VarChar, projectDescription)
        .input('endDate', mssql.Date, endDate)
        .execute('addProjectPROC')

        // console.log(result.rowsAffected);
         if(result.rowsAffected[0]==1){  
         return res.status(200).json({
             message: "Project created Succesfully",
         })}
         else{
             return res.status(400).json({message: "Creation failed"})
         }
 
     
    
} catch (error) {
    createProjectsTable()
    return res.status(400).json({error: "Kindly input the correct date format and details"})
}   }

const viewallprojects = async(req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const projects = (await pool.request().execute('getAllProjects')).recordset
        // console.log(projects);
        return res.status(200).json({projects: projects})

        
    } catch (error) {
        return res.status(500).json({error: error, user_message:"There is a problem with our server, maintanance team will get to that soon"})
    }
}

const getOneProject = async(req, res)=>{
    try {
        const projectId = req.params.projectId
        const pool = await (mssql.connect(sqlConfig))
        const result = (await pool.request()
            .input('projectId', projectId)
            .execute('getOneProject')).recordset

        return res.status(200).json({project: result})    
    } catch (error) {
        return res.json({error})
    }
    
    
}

const updateProject = async(req,res)=>{
    try {
        const projectId = req.params.projectId
        const {projectName,projectDescription,startDate,endDate} = req.body

        const pool = await mssql.connect(sqlConfig)
        
            const result = await pool.request()
            .input('projectId', mssql.VarChar, projectId)
            .input('projectName', mssql.VarChar, projectName)
            .input('projectDescription', mssql.VarChar, projectDescription)
            .input('startDate',mssql.Date, startDate)
            .input('endDate', mssql.Date, endDate)
            .execute('updateProject')

            // console.log(result.rowsAffected);            
             if(result.rowsAffected==1){  
             return res.status(200).json({
                 message: "Project updated Succesfully",
             })}
             else{
                 return res.status(400).json({message: "Update failed"})
             }
        
    } catch (error) { 
        return res.json({error})
    }
}

const deleteProject= async(req,res)=>{
    try {
        const projectId = req.params.projectId

        const pool = await (mssql.connect(sqlConfig))

        const result = await pool.request()
        .input('projectId', projectId)
        .execute('deleteProject')

        if (result.rowsAffected==1){
            return res.status(200).json({
                message: 'deleted successfully'
            })
        }
        else{
            return res.status(400).json({
                message: 'Project not found'
            })
        } 
    } catch (error) {
        
    }
}
const allCompletedProjects = async(req,res)=>{

    try {
        const pool = await (mssql.connect(sqlConfig))
        const result = (await pool.request()
        .execute('allCompletedProjects')).recordset

        return res.json({completedProjects: result})

    } catch (error) {
        return res.json({error})
    }
    
}


const unassignedProjects = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))
        const result = (await pool.request()
            .execute('unassignedProjectsProc')).recordset

        return res.status(200).json({projects: result}) 
        
        
    } catch (error) {
        return res.status(400).json({error})
    }
    
    
}

module.exports = {
    createProject,
    deleteProject,
    viewallprojects,
    getOneProject,
    updateProject,
    allCompletedProjects,
    unassignedProjects
}