import { Router } from "express";
import { registerNewUser , loginUser } from "../api/users.functions.js";

const router = Router();

router.post('/register' , registerNewUser)
router.post('/login', loginUser)


export default router