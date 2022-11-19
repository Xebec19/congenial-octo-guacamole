import express, { Router } from 'express';
import controllerWrapper from '../middleware/controllerWrapper';
import userCheckMiddleware from '../middleware/user-check';
import validationMiddleware from '../middleware/validationMiddleware';
import { createOrder, viewProduct } from './controllers';
import viewProductSchema from './schemas/view-products.schema';

const router = express.Router();

const childRouter = (mainRouter: Router) => {
    mainRouter.use('/buyer', router);
};

router.use(userCheckMiddleware('buyer'));

router.post(
    '/v1/view-products',
    validationMiddleware(viewProductSchema),
    controllerWrapper(viewProduct),
);

router.post('/v1/create-order', controllerWrapper(createOrder));

export default childRouter;
