import express from 'express';

import authRouter from './auth/routes';

const router = express.Router();

authRouter(router);

export default router;