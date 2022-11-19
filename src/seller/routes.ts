import express, { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    editProduct,
    listOrders,
    listProduct,
    updateOrder,
} from './controllers';
import createProductSchema from './schemas/create-product.schema';
import listProductsSchema from './schemas/list-product.schema';
import editProductSchema from './schemas/update-product.schema';
import listOrderSchema from './schemas/listOrder.schema';
import updateOrderSchema from './schemas/update-order.schema';
import validationMiddleware from '../middleware/validationMiddleware';
import controllerWrapper from '../middleware/controllerWrapper';

const router = express.Router();

const childRouter = (mainRouter: Router) => {
    mainRouter.use('/seller', router);
};

router.post(
    '/v1/create-product',
    validationMiddleware(createProductSchema),
    createProduct,
);

router.post(
    '/v1/list-products',
    validationMiddleware(listProductsSchema),
    controllerWrapper(listProduct),
);

router.post(
    '/v1/edit-product',
    validationMiddleware(editProductSchema),
    controllerWrapper(editProduct),
);

router.get('/v1/delete-product', controllerWrapper(deleteProduct));

router.post(
    '/v1/list-orders',
    validationMiddleware(listOrderSchema),
    controllerWrapper(listOrders),
);

router.post(
    '/v1/update-order',
    validationMiddleware(updateOrderSchema),
    controllerWrapper(updateOrder),
);

export default childRouter;
