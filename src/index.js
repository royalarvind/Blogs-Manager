const { response } = require('express')
const express = require('express')
const userrouter = require('./routers/user.js')
const blogrouter = require('./routers/blog') 

const app = express()
require('./db/mongoose.js')


const PORT = process.env.PORT||3000

app.use(express.json())
app.use(userrouter)
app.use(blogrouter)

app.listen(PORT,()=>{
    console.log('Server is up and running on '+PORT)
})