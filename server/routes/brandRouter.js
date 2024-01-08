import {Router} from 'express';
import { BrandController } from '../controllers/brandController.js';
import { roleMiddleware } from '../middleware/checkRoleMiddleware.js';
import { Auth } from '../middleware/authMiddleware.js';
const brandController = new BrandController();
const brandRouter = new Router();

brandRouter.post('/',roleMiddleware('ADMIN'),brandController.create)
brandRouter.get('/',brandController.getAll)

export default brandRouter