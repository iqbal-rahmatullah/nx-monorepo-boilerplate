import { PrismaClient } from '@prisma/client';
import { ServerLogger } from '../../utils';

export const userPrisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

const logger = new ServerLogger();

userPrisma.$on('query', (e) => {
  logger.info(`Query: ${e.query} - Params: ${e.params}`);
});

userPrisma.$on('error', (e) => {
  logger.error(`Error: ${e.message} - Target: ${e.target}`);
});

userPrisma.$on('info', (e) => {
  logger.debug(`Info: ${e.message} - Target: ${e.target}`);
});

userPrisma.$on('warn', (e) => {
  logger.warning(`Warning: ${e.message} - Target: ${e.target}`);
});
