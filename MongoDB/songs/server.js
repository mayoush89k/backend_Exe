import 'dotenv/config';
import express from "express";
import songRoutes from "./routes/songRoute.js";
import { errorHandler } from './middlewares/errorMiddleware.js';
import cors from 'cors'
import {connection} from'./config/db.js'


const app = express();

// cors middleware
app.use(cors())

// Middleware for json parsing 
app.use(express.json());

// Song routes
app.use("/api/v1/songs", songRoutes);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connection().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})
