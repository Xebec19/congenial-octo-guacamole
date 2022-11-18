import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validationMiddleware = (schema, property) => (req:Request,res:Response,next:NextFunction) => {
                const { error } = schema.validate(req.body);
                const valid = error == null;
                if(valid){
                next();
                }
        };

export default validationMiddleware;