import {
  AuthRequest,
  ServerLogger,
  UnauthorizedException,
} from '@stores/shared';
import { NextFunction, Response } from 'express';
import { JwtService } from '../jwt/jwt';
import { IAuthRepository } from '../repository/IAuthRepository';
import { AuthRepository } from '../repository/AuthRepository';
import { User } from '@prisma/client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: Omit<User, 'hashedPassword'> | null;
    }
  }
}

export const authorizationGuard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const logger = new ServerLogger();
  try {
    const authRepository: IAuthRepository = new AuthRepository();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('Authorization token is missing');
      throw new UnauthorizedException('Authorization token is missing');
    }

    const decoded = await JwtService.verifyToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    logger.info(`Authorization token decoded and isert to database ${decoded}`);
    // Update or insert session last_used_at in the database
    await authRepository.updateOrInsertSession((decoded as User).id, token);

    req.user = decoded as Omit<User, 'hashedPassword'>;

    next();
  } catch (error) {
    next(error);
  }
};
