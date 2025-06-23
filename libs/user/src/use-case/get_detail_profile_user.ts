import { AuthRequest } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { IUserService } from '../services/IUserService';
import { UserService } from '../services/UserService';

export const getUserDetailProfileCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userService: IUserService = new UserService();
  try {
    const user = await userService.getDetailUser(req.user.id);
    res.status(200).json({
      message: 'Get user detail profile successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
