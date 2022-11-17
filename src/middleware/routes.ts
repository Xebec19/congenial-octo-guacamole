import { NextFunction, Request, Response } from 'express';

const router = (req:Request,res:Response,next:NextFunction) => {
    next();
};

export default router;