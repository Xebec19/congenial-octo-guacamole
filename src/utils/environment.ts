import * as dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
export const serverPort = PORT;
export const env = process.env.NODE_ENV;
export const jwtSecret = process.env.JWT_SECRET;
