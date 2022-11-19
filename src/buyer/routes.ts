import express, { Router } from 'express';
import controllerWrapper from '../middleware/controllerWrapper';
import validationMiddleware from '../middleware/validationMiddleware';
import { createOrder, viewProduct } from './controllers';
import viewProductSchema from './schemas/view-products.schema';

const router = express.Router();

const childRouter = (mainRouter: Router) => {
    mainRouter.use('/buyer', router);
};

router.post(
    '/v1/view-products',
    validationMiddleware(viewProductSchema),
    controllerWrapper(viewProduct),
);

router.post('/v1/create-order', controllerWrapper(createOrder));
