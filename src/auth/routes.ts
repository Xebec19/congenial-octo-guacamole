import express, { Router } from 'express';
import controllerWrapper from '../middleware/controllerWrapper';
import validationMiddleware from '../middleware/validationMiddleware';
import { login, register } from './controllers';
import registerSchema from '../requests/register.schema';
import logger from '../utils/logger';

const router = express.Router();

const childRouter = (mainRouter:Router) => {
    mainRouter.use('/auth',router);
};

router.post('/register',validationMiddleware(registerSchema),controllerWrapper(register));
router.post('/login',controllerWrapper(login));

export default childRouter;