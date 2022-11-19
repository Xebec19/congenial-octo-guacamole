import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from './logger';
import { jwtSecret } from './environment';

/**
 * @desc verifies a jwt token
 * @param token jwt token
 * @returns payload saved in token
 */
export const decryptToken = (token: string) => {
    try {
        const { payload } = <JwtPayload>jwt.verify(token, `${jwtSecret}`);
        logger.log('info', payload);
        return payload;
    } catch (error: any) {
        logger.log('error', error.stack);
        return false;
    }
};

/**
 * @desc encrypts a payload into jwt token
 * @param payload
 * @returns jwt token
 */
export const encryptToken = (payload: object): string => {
    const token = jwt.sign({ payload }, `${jwtSecret}`);
    return token;
};
