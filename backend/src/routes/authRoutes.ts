import express from 'express';
import { signinValidator, signupValidator } from '../validators/client';
import { signupController, activationController, loginController, getUser } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/signup', signupValidator, signupController);
router.post('/activation/:activationToken', activationController);
router.post('/login', signinValidator, loginController)
router.get('/getClient', authenticate, getUser);


export default router;






