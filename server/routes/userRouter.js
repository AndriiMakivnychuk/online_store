import {Router} from 'express';
import {UserController} from '../controllers/userController.js';
import { Auth } from '../middleware/authMiddleware.js';
const userController = new UserController()
const userRouter = new Router();


userRouter.post('/registration',userController.registration)
userRouter.post('/login',userController.login)
userRouter.get('/auth', Auth , userController.check)

export default userRouter