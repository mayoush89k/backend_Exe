import express from 'express'
import { errorHandler } from './middleware/errorMiddleware.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/books', bookRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000 
app.listen(PORT , () => {
    console.log(`server is listening from port ${PORT}`)
})