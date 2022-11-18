import { NextFunction, Request, Response } from 'express';
import { env } from '../utils/environment';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';

const controllerWrapper =
    (func: (req: Request, res: Response, next: NextFunction) => unknown) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err: any) {
            if (err.isOperational) {
                logger.log('error', err.stack);
                res.status(500).send(errorResponse(err.message));
            } else if (env === 'production') {
                process.exit(1);
            }
        }
    };

export default controllerWrapper;
