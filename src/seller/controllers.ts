import { row_status } from '@prisma/client';
import { Request, Response } from 'express';
import AppError from '../utils/AppError';
import logger from '../utils/logger';
import prisma from '../utils/prisma-client';
import { successResponse } from '../utils/response';

/**
 * @route /api/seller/v1/create-product
 * @desc creates a product
 * @param { string } productName
 * @param { string } productPrice
 * @return product id
 */
export const createProduct = async (req: Request, res: Response) => {
    const { productName, productPrice } = req.body;
    const product = await prisma.products.create({
        data: {
            product_name: productName,
            product_price: productPrice,
            created_by: res.locals.user.id ?? '',
            status: 'active',
        },
        select: {
            product_id: true,
        },
    });
    return res
        .status(201)
        .send(
            successResponse('Product created successfully', product.product_id),
        );
};

/**
 * @route /api/seller/v1/read-product?id [get]
 * @desc reads a product
 * @param { string } id
 */
export const readProduct = async (req: Request, res: Response) => {
    const { id: productId } = req.body;
    const product = await prisma.products.findFirst({
        where: {
            AND: {
                product_id: productId,
                created_by: res.locals.user.id,
                status: row_status.active,
            },
        },
        select: {
            product_id: true,
            product_name: true,
            product_price: true,
        },
    });
    return res.status(200).send(successResponse('Product fetched', product));
};

/**
 * @route /api/seller/v1/list-product
 * @param offset no of records to skipped
 * @param limit no of records to be fetched
 * @param orderOn property which defines seqn to arrange records
 * @param orderBy asc or desc
 */
export const listProduct = async (req: Request, res: Response) => {
    const { offset, limit, orderOn } = req.body;
    const list =
        await prisma.$queryRaw`SELECT PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE 
        FROM PRODUCTS
        WHERE created_by::text = ${res.locals.user.id} and status = 'active'::row_status order by ${orderOn} asc 
        limit ${limit} offset ${offset}`;

    return res.status(200).send(successResponse('Products Fetched', list));
};

/**
 * @route /api/seller/v1/edit-product [post]
 * @param productId id of product
 * @param productName name of product
 * @param productPrice price of product
 * @return id of product
 */
export const editProduct = async (req: Request, res: Response) => {
    const { productId, productName, productPrice } = req.body;

    const updatedRecord = await prisma.products.update({
        data: { product_name: productName, product_price: productPrice },
        where: { product_id: productId },
        select: { product_id: true },
    });

    return res
        .status(200)
        .send(
            successResponse(
                'Product updated successfully',
                updatedRecord.product_id,
            ),
        );
};

/**
 * @route /api/seller/v1/delete-product [get]
 * @desc deletes a product
 * @param productId
 */
export const deleteProduct = async (req: Request, res: Response) => {
    const { id: productId } = req.query;
    if (!productId) throw new AppError('Insufficient parameters');

    const inactiveProduct = await prisma.products.update({
        data: { status: row_status.inactive },
        where: { product_id: `${productId}` },
        select: { product_id: true },
    });

    return res
        .status(200)
        .send(
            successResponse(
                'Product status updated',
                inactiveProduct.product_id,
            ),
        );
};

/**
 * @route /api/seller/v1/list-orders
 * @desc list orders in paginated way
 * @param { number } offset
 * @param { number } limit
 */
export const listOrders = async (req: Request, res: Response) => {
    const { offset, limit } = req.body;

    const orders =
        await prisma.$queryRaw`select order_id, buyer_id, buyer_name, seller_id, seller_name, status, price from v_orders
        where seller_id::text = ${res.locals.user.id} offset ${offset} limit ${limit};`;

    return res.status(200).send(successResponse('Orders fetched', orders));
};

/**
 * @route /api/seller/v1/update-order
 * @param { string } orderId id of order
 * @param { 'pending' | 'cancelled' | 'inprogress' | 'served' } status status of order
 */
export const updateOrder = async (req: Request, res: Response) => {
    const { orderId, status } = req.body;

    const order = await prisma.orders.update({
        data: { status: `${status}` },
        where: { order_id: orderId },
        select: { order_id: true },
    });

    return res
        .status(200)
        .send(successResponse('Order updated', order.order_id));
};
