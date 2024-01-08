import Router from 'express';
import { DeviceController } from '../controllers/deviceController.js';
import { roleMiddleware } from '../middleware/checkRoleMiddleware.js';
import { Auth } from '../middleware/authMiddleware.js';
const deviceController = new DeviceController();
const deviceRouter = new Router();


deviceRouter.post('/',roleMiddleware('ADMIN'),deviceController.create)
deviceRouter.get('/',deviceController.getAll)
deviceRouter.get('/:id',deviceController.getOne)

export default deviceRouter