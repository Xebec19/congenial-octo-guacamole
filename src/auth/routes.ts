import express, { Router } from 'express';
import controllerWrapper from '../middleware/controllerWrapper';
import validationMiddleware from '../middleware/validationMiddleware';
import { login, register } from './controllers';
import registerSchema from './schemas/register.schema';
import loginSchema from './schemas/login.schema';

const router = express.Router();

const childRouter = (mainRouter: Router) => {
    mainRouter.use('/auth', router);
};

router.post(
    '/v1/register',
    validationMiddleware(registerSchema),
    controllerWrapper(register),
);

router.post(
    '/v1/login',
    validationMiddleware(loginSchema),
    controllerWrapper(login),
);

export default childRouter;
