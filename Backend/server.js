const express = require('express')
const { projectRouter } = require('./Routes/projectRoute')
const app = express()

app.use(express.json())
app.use('/project', projectRouter)

app.use((err, req, res, next)=>{
    res.json({Error: err})
})
app.listen(5000,()=>{
    console.log('server is actively running');
})
// dxsx