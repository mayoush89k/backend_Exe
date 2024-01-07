import express, { json } from 'express'
import userRouter from '../routes/users.Routes.js'

const server = express()
server.use(express.json())

server.use('/users' , userRouter)

server.listen(3434 , () => {
    console.log('Server is running on port 3434')
})