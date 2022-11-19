import express from 'express';

import authRouter from './auth/routes';
import sellerRoutes from './seller/routes';
import decodeToken from './middleware/decode-token';

const router = express.Router();

authRouter(router);

router.use(decodeToken);

sellerRoutes(router);

export default router;
