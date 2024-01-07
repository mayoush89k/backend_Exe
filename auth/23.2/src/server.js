import express, { json } from "express";
import userRouter from "../routes/users.Routes.js";
import { connectDB } from "../db/db.connection.js";

const server = express();

server.use(express.json());

server.use("/users", userRouter);

connectDB().then(() => {
  server.listen(3434, () => {
    console.log("Server is running on port 3434");
  });
});
