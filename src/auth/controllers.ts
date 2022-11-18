import { Request, Response } from 'express';

export const register = (req:Request,res:Response) => {
    res.send('Register working!');
};

export const login = (req:Request, res:Response) => {
    res.send('Login working!');
};