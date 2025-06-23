import { PrismaClient } from '@prisma/client';
import { ServerLogger } from '../../utils';

export const authPrisma = new PrismaClient({
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

authPrisma.$on('query', (e) => {
  logger.info(`Query: ${e.query} - Params: ${e.params}`);
});

authPrisma.$on('error', (e) => {
  logger.error(`Error: ${e.message} - Target: ${e.target}`);
});

authPrisma.$on('info', (e) => {
  logger.debug(`Info: ${e.message} - Target: ${e.target}`);
});

authPrisma.$on('warn', (e) => {
  logger.warning(`Warning: ${e.message} - Target: ${e.target}`);
});
