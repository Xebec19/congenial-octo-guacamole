import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AppError from '../utils/AppError';
import prisma from '../utils/prisma-client';
import { successResponse } from '../utils/response';
import { encodeToken } from '../utils/jsonwebtoken';

/**
 * @route /api/auth/register [post]
 * @param {string} username
 * @param {password} password
 * @param {'buyer'|'seller'} type type of user
 */
export const register = async (req: Request, res: Response) => {
    const { username, password, type } = req.body;

    // check if user exists
    const existingUser = await prisma.users.findFirst({
        where: {
            AND: {
                username: { equals: username },
                type: { equals: type },
            },
        },
    });

    if (existingUser) {
        throw new AppError('Username already exists');
    }

    // hash password
    const hash = await bcrypt.hashSync(password, 8);

    // create new user
    await prisma.users.create({
        data: {
            username,
            password: hash,
            type,
            status: 'active',
        },
    });

    return res
        .status(201)
        .json(successResponse('User created successfully'))
        .end();
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await prisma.users.findFirstOrThrow({
        where: {
            username,
        },
    });

    if (!bcrypt.compareSync(password, user.password)) {
        throw new AppError('Password mismatch');
    }

    const token = await encodeToken({ id: user.user_id });

    res.status(200).send(successResponse('User logged in', token));
};
