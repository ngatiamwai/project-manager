const express = require('express')
const { projectRouter } = require('./Routes/projectRoute')
const { userRouter } = require('./Routes/userRouter')
const cors=require('cors')
const bodyParser=require('body-parser')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/project', projectRouter)
app.use('/user',userRouter)

app.use((err, req, res, next)=>{
    console.log(err.message);
    res.json({Error: err})
})
app.listen(5000,()=>{
    console.log('server is actively running on port 5000');
})
