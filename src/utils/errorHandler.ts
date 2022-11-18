import { Request, Response } from 'express';
import logger from './logger';

const errorHandler = (err: Error, req: Request, res: Response) => {
    logger.log('error', err.stack);
    res.status(500).send('Something broke!');
};

export default errorHandler;
