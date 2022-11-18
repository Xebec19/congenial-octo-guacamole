import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from './logger';
import { jwtSecret } from './environment';

export const decodeToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        jwt.verify(`${token}`, `${jwtSecret}`, (err, decoded) => {
            if (err) {
                throw new Error(err.message);
            }
            res.locals.user = decoded;
            next();
        });
    } catch (error: any) {
        logger.log('error', error.stack);
        res.status(401).json({ message: error.message }).end();
    }
};

export const encodeToken = (payload: object): string => {
    const token = jwt.sign({ payload }, `${jwtSecret}`);
    return token;
};
