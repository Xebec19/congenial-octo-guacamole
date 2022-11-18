import express from 'express';
import morgan from 'morgan';
import AppError from './utils/AppError';
import logger from './utils/logger';
import router from './routes';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(morgan(':method :url :response-time'));

app.use('/api', router);

app.use((req,res) => {
    res.status(400).send('Not Found');
});

app.use(errorHandler);

export default app;