import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';

const controllerWrapper = (func: (req: Request, res: Response, next:NextFunction) => unknown) => async (req:Request,res:Response,next:NextFunction) => {
        try{
            await func(req,res,next);
        } catch(err:any) {
            if(typeof err === typeof AppError){
                if(err.isOperational){
                    logger.log('error',err);
                    res.status(500).send(errorResponse(err.message));
                }
            }
        }
    };

export default controllerWrapper;