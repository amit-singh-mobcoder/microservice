import express, { RequestHandler } from 'express'
import { UserController } from '../controllers/UserController';
const userController = new UserController();
const router = express.Router();

router.route('/').post(userController.register as RequestHandler)

export default router;