import { registerCase } from '@store/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login');
authRouter.post('/register', registerCase);

export default authRouter;
