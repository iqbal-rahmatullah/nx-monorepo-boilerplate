import { ServerLogger } from '@stores/shared';
import { Router } from 'express';

const authRouter = Router();

const logger = new ServerLogger();

authRouter.get('/', (req, res) => {
  logger.debug('GET /auth endpoint hit');
  res.status(200).json({ message: 'Welcome to the Auth API' });
});
authRouter.post('/login');
authRouter.post('/register');

export default authRouter;
