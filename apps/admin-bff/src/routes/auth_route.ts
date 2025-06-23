import { loginCase } from '@store/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res, next) => {
  req.body.isAdmin = true;
  loginCase(req, res, next);
});

export default authRouter;
