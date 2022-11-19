import express, { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    editProduct,
    listOrders,
    listProduct,
    updateOrder,
} from './controllers';
import createProductSchema from '../requests/create-product.schema';
import listProductsSchema from '../requests/list-product.schema';
import editProductSchema from '../requests/update-product.schema';
import listOrderSchema from '../requests/listOrder.schema';
import updateOrderSchema from '../requests/update-order.schema';
import validationMiddleware from '../middleware/validationMiddleware';

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
    listProduct,
);

router.post(
    '/v1/edit-product',
    validationMiddleware(editProductSchema),
    editProduct,
);

router.get('/v1/delete-product', deleteProduct);

router.post(
    '/v1/list-orders',
    validationMiddleware(listOrderSchema),
    listOrders,
);

router.post(
    '/v1/update-order',
    validationMiddleware(updateOrderSchema),
    updateOrder,
);

export default childRouter;
