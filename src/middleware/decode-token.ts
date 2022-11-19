import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';
import { decryptToken } from '../utils/jsonwebtoken';
import AppError from '../utils/AppError';

// eslint-disable-next-line consistent-return
const decodeToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] ?? '';
        const payload = decryptToken(token);
        if (!payload) throw new AppError('Invalid token');
        res.locals.user = payload;
        next();
    } catch (error: any) {
        logger.log('error', error.stack);
        return res.status(403).send(errorResponse(error.message, error.stack));
    }
};

export default decodeToken;
