import express from 'express'
import { adminLogin, loginUser, registerUser } from '../controllers/UserController.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter