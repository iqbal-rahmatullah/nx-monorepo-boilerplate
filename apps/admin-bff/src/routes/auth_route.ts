import { ServerLogger } from '@stores/shared';
import { Router } from 'express';

const authRouter = Router();

const logger = new ServerLogger();

authRouter.post('/login');
authRouter.post('/register');

export default authRouter;
