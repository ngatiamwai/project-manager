const nodemailer = require('nodemailer')
const dotenv = require('dotenv')


function createTransporter(config){
    return nodemailer.createTransport(config)
}

let config = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port:587,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PWD
    }
}

const sendMail = async(messageOptions)=>{
    let transporter = createTransporter(config);

    await transporter.verify()
    await transporter.sendMail(messageOptions, (err, info)=>{
        // console.log(info);
    })
}

module.exports = {
    sendMail
}