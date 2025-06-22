import { Configuration } from '..';

const DEVELOPMENT: Configuration = {
  NODE_ENV: 'development',
  PORT_ADMIN_APP: +(process.env.PORT_ADMIN_APP || 3000),
  PORT_USER_APP: +(process.env.PORT_USER_APP || 3001),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
};

export default DEVELOPMENT;
