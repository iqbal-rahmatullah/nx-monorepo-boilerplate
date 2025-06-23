import { authorizationGuard } from '@store/auth';
import express from 'express';
import { getUserDetailProfileCase } from '@store/user';

const userRoute = express.Router();

userRoute.use(authorizationGuard);
userRoute.get('/', getUserDetailProfileCase);

export default userRoute;
