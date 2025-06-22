import { PrismaClient } from '@prisma/client';

export const userPrisma = new PrismaClient({
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
  ],
});

userPrisma.$on('query', (e) => {
  console.log(`Query: ${e.query}`);
});
