const ejs = require('ejs')
const mssql = require('mssql')
const {sqlConfig} = require('../Config/config')
const { sendMail } = require('../Helpers/email')

const completed = async ()=>{
    const pool = await mssql.connect(sqlConfig)

    if (pool.connected){
        const completedProjects = (await pool.request().query(`SELECT p.projectId, p.projectName, p.projectDescription,  p.endDate,  u.userName  FROM projectTable p
        JOIN userTable u ON u.userId = p.assignedTo
        WHERE status=1 AND emailAdminCompleted=0`)).recordset

        const adminEmail = (await pool.request().query(`SELECT userEmail FROM userTable WHERE role='admin'`)).recordset[0].userEmail
        
        // console.log(completedProjects);
        // console.log(adminEmail);

        for(let project of completedProjects){
            ejs.renderFile('./Templates/admin.ejs', {userName: project.userName,title: project.projectName, desc: project.projectDescription, enddate: project.endDate}, async(error, html)=>{
                const message = {
                    from: process.env.EMAIL,
                    to: adminEmail,
                    subject: "Client completed a project",
                    html
                }
                try {
                    await sendMail(message);
                    await pool.request().query(`UPDATE projectTable SET emailAdminCompleted = 1 WHERE projectId =  '${project.projectId}';`)
                } catch (error) {
                    console.log(error);
                }
            })
        }

    }else{
        console.log('connection failed');
    }
}

module.exports = {
    completed
}