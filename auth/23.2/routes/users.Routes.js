import {Router} from 'express'
import { loginUser, registerNewUser } from '../api/users.functions.js'

const router = Router()

router.post('/register' , registerNewUser)
router.post('/login', loginUser)

export default router