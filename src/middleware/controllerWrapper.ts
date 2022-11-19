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
            logger.log('error', err.stack);
            res.status(500).send(errorResponse(err.message, err.stack));
        }
    };

export default controllerWrapper;
