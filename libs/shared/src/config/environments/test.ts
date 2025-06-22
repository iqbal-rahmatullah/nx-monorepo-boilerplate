import { Configuration } from '..';

const TEST: Configuration = {
  NODE_ENV: 'test',
  PORT_ADMIN_APP: +(process.env.PORT_ADMIN_APP || 3000),
  PORT_USER_APP: +(process.env.PORT_USER_APP || 3001),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
  API_VERSION: process.env.API_VERSION || 'v1',
};

export default TEST;
