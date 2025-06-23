import { Role } from '@prisma/client';
import { authorizationGuard, roleGuard } from '@store/auth';
import { getAllPostCase } from '@store/post';
import express from 'express';

const postRouter = express.Router();

postRouter.use(authorizationGuard);

// Role guard only allows access to users with the ADMIN role
postRouter.use(roleGuard([Role.ADMIN]));

postRouter.get('/', getAllPostCase);

export default postRouter;
