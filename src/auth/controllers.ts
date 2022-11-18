import { Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * @route /api/auth/register [post]
 * @param {string} username
 * @param {password} password
 * @param {'buyer'|'seller'} type type of user
 */
export const register = (req:Request,res:Response) => {
    
    res.send('Register working!');
};

export const login = (req:Request, res:Response) => {
    res.send('Login working!');
};