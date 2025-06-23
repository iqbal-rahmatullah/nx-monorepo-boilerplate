import { authorizationGuard } from '@store/auth';
import express from 'express';
import { addPostCase } from '@store/post';

const postRouter = express.Router();

postRouter.use(authorizationGuard);
postRouter.post('/', addPostCase);

export default postRouter;
