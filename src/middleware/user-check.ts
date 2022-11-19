import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import logger from '../utils/logger';
import { successResponse } from '../utils/response';

const userCheckMiddleware =
    // eslint-disable-next-line consistent-return
    (type: string) => (req: Request, res: Response, next: NextFunction) => {
        try {
            if (res.locals.user.type !== type) {
                throw new AppError(`Only ${type} can access this route`);
            }
            next();
        } catch (err: any) {
            logger.log('error', err.stack);
            return res
                .status(403)
                .send(successResponse('Permission denied', err.message));
        }
    };
export default userCheckMiddleware;
