const express = require('express')
const app = express()

app.use(express.json)
app.use((err, req, res, next)=>{
    res.json({Error: err})
})
app.listen(5000,()=>{
    console.log('server is actively running');
})