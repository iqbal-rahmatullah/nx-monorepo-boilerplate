import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import PRODUCTION from './environments/prod';
import DEVELOPMENT from './environments/dev';
import TEST from './environments/test';

const { NODE_ENV } = process.env;

export type Configuration = {
  NODE_ENV: string;
  PORT_ADMIN_APP: number;
  PORT_USER_APP: number;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  APP_LOG_LEVEL: string;
  API_VERSION: string;
};

let currentConfig: Configuration = DEVELOPMENT;

switch (NODE_ENV) {
  case 'production':
    currentConfig = PRODUCTION;
    break;
  case 'test':
    currentConfig = TEST;
    break;
  default:
    currentConfig = DEVELOPMENT;
    break;
}

export { currentConfig as config };
export { AppServer } from './server/app_server';
