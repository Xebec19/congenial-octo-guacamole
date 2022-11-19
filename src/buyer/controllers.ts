import { Request, Response } from 'express';
import logger from '../utils/logger';
import prisma from '../utils/prisma-client';
import { successResponse } from '../utils/response';

/**
 * @route /api/seller/v1/view-products [post]
 * @desc lists products offered by a seller
 * @param { number } offset
 * @param { number } limit
 * @param { string } sellerId user id of seller
 */
export const viewProduct = async (req: Request, res: Response) => {
    const { offset, limit, sellerId } = req.body;

    const list = await prisma.products.findMany({
        where: { created_by: sellerId },
        skip: offset,
        take: limit,
        select: {
            product_id: true,
            product_name: true,
            product_price: true,
        },
    });

    return res.status(200).send(successResponse('Products fetched', list));
};

/**
 * @route /api/buyer/v1/create-order
 * @desc takes an array of product and creates an order
 * @param { string } sellerId
 * @param { array } productList
 */
export const createOrder = async (req: Request, res: Response) => {
    const { sellerId, productList } = req.body;

    const seller = await prisma.users.count({
        where: {
            user_id: sellerId,
            type: 'seller',
        },
    });

    logger.log('info', seller);

    const order = await prisma.orders.create({
        data: {
            order_by: sellerId,
            order_for: res.locals.user.id,
            status: 'pending',
        },
        select: {
            order_id: true,
        },
    });

    const orderList = productList.map((record: any) => ({
        order_id: order.order_id,
        product_id: record.productId,
        quantity: record.quantity,
    }));

    await prisma.order_items.createMany({ data: orderList });

    return res
        .status(200)
        .send(successResponse('Order created successfully', order.order_id));
};
