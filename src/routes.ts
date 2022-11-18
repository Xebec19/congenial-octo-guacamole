import express from 'express';

import authRouter from './auth/routes';
import { decodeToken } from './utils/jsonwebtoken';

const router = express.Router();

authRouter(router);

// Protected Routes
router.use(decodeToken);

export default router;
