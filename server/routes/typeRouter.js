import {Router} from 'express';
import { TypeController } from '../controllers/typeController.js';
import { roleMiddleware } from '../middleware/checkRoleMiddleware.js';
import { Auth } from '../middleware/authMiddleware.js';
const typeController = new TypeController()
const typeRouter = new Router();

typeRouter.post('/',roleMiddleware('ADMIN'),typeController.create)
typeRouter.get('/',typeController.getAll)

export default typeRouter