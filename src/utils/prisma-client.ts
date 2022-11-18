import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ]
});

prisma.$on('query', (e: any) => {
    logger.log('debug',`Query: ${  e.query}`);
    logger.log('debug',`Params: ${  e.params}`);
    logger.log('debug',`Duration: ${  e.duration  }ms`);
});

export default prisma;