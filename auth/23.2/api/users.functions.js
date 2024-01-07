import {
  createUserDB,
  getUserByUsernameDB,
} from "../utils/db.function.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'

var salt = bcrypt.genSaltSync(10);

export const registerNewUser = async (req, res, next) => {
  try {
    // check required fields
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(409);
      throw new Error("All of Username, Password and Email are required");
    }

    let newUser = await getUserByUsernameDB(username);

    // check if user exists
    if (newUser) {
      res.status(409);
      throw new Error("Username already taken");
    }

    // save the user to database
    const hashedPassword = bcrypt.hashSync(password, salt);
    newUser = await createUserDB({ username, password: hashedPassword });
    console.log('newUser: ', newUser);

    // send response
    res.send(`${newUser.username} has been successfully signedUp`);
  } catch (error) {
    res.send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.query;
    const user = await getUserByUsernameDB(username);

    // check username from db
    if (!user) {
      res.status(404);
      throw new Error("Username is not found");
    }
    // compare passwords
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401);
      throw new Error("Invalid password");
    }
    // create token and send it to client side
    const SECRET_KEY = 'process.env.SECRET_KEY';
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true }).json({
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
