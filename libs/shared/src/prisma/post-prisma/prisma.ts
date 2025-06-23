import { PrismaClient } from '@prisma/client';
import { ServerLogger } from '../../utils';

export const postPrisma = new PrismaClient({
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

postPrisma.$on('query', (e) => {
  logger.info(`Query: ${e.query} - Params: ${e.params}`);
});

postPrisma.$on('error', (e) => {
  logger.error(`Error: ${e.message} - Target: ${e.target}`);
});

postPrisma.$on('info', (e) => {
  logger.debug(`Info: ${e.message} - Target: ${e.target}`);
});

postPrisma.$on('warn', (e) => {
  logger.warning(`Warning: ${e.message} - Target: ${e.target}`);
});
