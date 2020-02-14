const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/users')
const PORT = 3001
const app = express() 
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log('Running on PORT: ', PORT)
})