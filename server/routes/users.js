import { Router } from 'express';
import controllers from "../controllers/index.js";
import {authMiddleware} from "../middlewaree/authMiddleware.js"

const router = Router();
router.post('/signup', controllers.authController.signup.bind(controllers.authController));

router.post('/signin', controllers.authController.signin.bind(controllers.authController));

router.get('/info', authMiddleware, controllers.userController.info.bind(controllers.userController));

router.get('/logout', authMiddleware, controllers.authController.logout.bind(controllers.authController));

router.get('/refreshTokens', authMiddleware, controllers.authController.refreshTokens.bind(controllers.authController));

export default router;
