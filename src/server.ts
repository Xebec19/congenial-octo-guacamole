import app from './index';
import { serverPort } from './utils/environment';
import logger from './utils/logger';

app.listen(serverPort,() => logger.log('info',`Server running at ${serverPort}`));