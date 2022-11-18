import Ajv, { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { errorResponse } from '../utils/response';

const ajv = new Ajv();

const validationMiddleware = (schema: any) => {
    const validate = ajv.compile(schema);
    // eslint-disable-next-line consistent-return
    return (req: Request, res: Response, next: NextFunction) => {
        if (validate(req.body)) {
            next();
        } else {
            logger.log('warn', validate.errors);
            return res
                .status(400)
                .send(errorResponse('Invalid parameters'))
                .end();
        }
    };
};

export default validationMiddleware;
