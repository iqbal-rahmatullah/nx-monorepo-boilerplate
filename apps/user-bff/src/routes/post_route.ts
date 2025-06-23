import { authorizationGuard } from '@store/auth';
import express from 'express';
import {
  addPostCase,
  deletePostCase,
  getAllPostCase,
  getDetailPostCase,
  patchPostCase,
} from '@store/post';

const postRouter = express.Router();

postRouter.use(authorizationGuard);
postRouter.post('/', addPostCase);
postRouter.get('/', getAllPostCase);
postRouter.get('/:id', getDetailPostCase);
postRouter.patch('/:id', patchPostCase);
postRouter.delete('/:id', deletePostCase);

export default postRouter;
