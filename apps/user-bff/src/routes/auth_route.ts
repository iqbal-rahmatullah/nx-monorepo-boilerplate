import { loginCase, registerCase } from '@store/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', loginCase);
authRouter.post('/register', registerCase);

export default authRouter;
