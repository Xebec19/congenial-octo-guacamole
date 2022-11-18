import express, { Router } from 'express';
import { login, register } from './controllers';

const router = express.Router();

const childRouter = (mainRouter:Router) => {
    mainRouter.use('/auth',router);
};

router.post('/register',register);
router.post('/login',login);

export default childRouter;