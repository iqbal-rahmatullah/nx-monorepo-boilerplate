import { RegisterUserDTO } from '../dto/register_user_dto';
import { ServerLogger, ValidationParse } from '@stores/shared';
import { registerValidator } from '../validators/register_validator';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { IAuthService } from '../services/IAuthService';
import { User } from '@prisma/client';

const logger = new ServerLogger();

export const registerCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authService: IAuthService = new AuthService();

  try {
    const validatedData = ValidationParse.validate(registerValidator, req.body);

    const data = new RegisterUserDTO(validatedData);
    const result = await authService.registerUser(data);

    // Logging the registration event
    logger.info(`User registered: ${result}`);

    res.status(201).json({
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    logger.error('Error in RegisterCase: ' + error.message);
    next(error);
  }
};
