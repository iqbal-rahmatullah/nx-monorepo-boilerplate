import { AuthRequest, ForbiddenException } from '@stores/shared';
import { NextFunction, Request, Response } from 'express';

export const roleGuard = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const isHaveAccess = roles.includes(req.user.role);

    if (!isHaveAccess) {
      throw new ForbiddenException(
        `You do not have permission to access this resource. Required roles: ${roles.join(
          ', '
        )}`
      );
    }

    next();
  };
};
