import express from 'express'
import mongoose from 'mongoose'
import {errorHandler} from './middlewares/errorMiddleware.js'
import 'dotenv/config'
import productRouter from './routes/productRoutes.js'

const app = express();
app.use(express.json())

const CONNECTION_URL = process.env.MONGO_URL;
app.use('/products', productRouter)
app.use(errorHandler)

mongoose.connect(CONNECTION_URL).then(()=> {
    app.listen(4545 , ()=>{
        console.log('listening to server');
    })
})