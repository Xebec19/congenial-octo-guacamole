import winston from 'winston';
import { format } from 'date-fns';
import { env } from './environment';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: format(new Date(),'dd/MMM/yyyy hh:mm a') },
  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
        format: winston.format.simple(),
      })
  ],
});

if (env !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;