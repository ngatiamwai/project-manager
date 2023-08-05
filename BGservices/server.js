const express = require('express')
const cron = require('node-cron');
const { assigned } = require('./emailService/userAssigned');

const app = express()

cron.schedule('*/5 * * * * *', async()=>{
    console.log('running a task after 5 seconds');
    await assigned()
})

app.listen(5001,()=>{
    console.log('server for bg activities is running');
})