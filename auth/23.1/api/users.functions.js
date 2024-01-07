import { loadDB, writeDB } from "../utils/db.functions.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerNewUser = async (req, res) => {
  try {
    // check required fields
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(409);
      throw new Error("All of Username, Password and Email are required");
    }

    // check if username exist in db
    const db = loadDB();
    let userExist = db.find((user) => username == user.username);
    if (userExist) {
      res.status(409);
      throw new Error("Username already taken");
    }
    // hash the password and create a new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      _id: new Date().getTime(),
      username: username,
      password: hashedPassword,
      email: email,
      createdAt: new Date().toISOString(),
    };
    db.push(newUser);
    writeDB(db);
    res.send(newUser);
  } catch (error) {
    res.send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

export const loginUser = (req, res) => {
  try {
    const { username, password } = req.query;
    const db = loadDB();
    let user = db.find((user) => username == user.username);
    
    if (!user) {
      res.status(404);
      throw new Error("Username is not found");
    }

    // check th password
    const validatePassword = bcrypt.compare(password, user.password);

    if (!validatePassword) {
      res.status(401);
      throw new Error("Invalid password");
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    ); 
    res.cookie("token ", token, { httpOnly: true }).json({
      message: `Logged in as ${user.username}`,
      token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};
