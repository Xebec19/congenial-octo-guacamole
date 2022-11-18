import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import errorHandler from './utils/errorHandler';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(morgan(':method :url :response-time'));

app.use('/api', router);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.use(errorHandler);

export default app;
