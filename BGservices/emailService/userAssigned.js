const ejs = require('ejs')
const mssql = require('mssql')
const {sqlConfig} = require('../Config/config')
const { sendMail } = require('../Helpers/email')

const assigned = async ()=>{
    const pool = await mssql.connect(sqlConfig)

    if (pool.connected){
        const assignedusers = (await pool.request().query(`SELECT u.userEmail, u.userName,p.projectId, p.projectName, p.projectDescription, p.endDate
        FROM userTable u
        JOIN projectTable p ON u.userId = p.assignedTo
        WHERE p.userAssignedEmailed = 0;`)).recordset
        // let p = []
        // assignedusers.forEach(user=>{ p.push(user.userEmail)})
        // console.log(p);
        // console.log(assignedusers);
        for(let user of assignedusers){
            ejs.renderFile('./Templates/userAssigned.ejs', {username: user.userName,title: user.projectName, desc: user.projectDescription, enddate: user.endDate}, async(error, html)=>{
                const message = {
                    from: process.env.EMAIL,
                    to: user.userEmail,
                    subject: "New Project assignment",
                    html
                }
                try {
                    await sendMail(message);
                    await pool.request().query(`UPDATE projectTable SET userAssignedEmailed = 1 WHERE projectId =  '${user.projectId}';`)
                } catch (error) {
                    // console.log(error);
                }
            })
        }

    }else{
        console.log('connection failed');
    }
}

module.exports = {
    assigned
}