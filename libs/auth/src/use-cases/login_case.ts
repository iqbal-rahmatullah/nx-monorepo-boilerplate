import { ServerLogger, ValidationParse } from '@stores/shared';
import { NextFunction, Request, Response } from 'express';
import { loginValidator } from '../validators/login_validator';
import { LoginUserDTO } from '../dto/login_user_dto';
import { AuthService } from '../services/AuthService';

export const loginCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logger = new ServerLogger();
  const authService: AuthService = new AuthService();

  try {
    const validatedData = await ValidationParse.validate(
      loginValidator,
      req.body
    );

    const loginUserDTO = new LoginUserDTO(validatedData);

    const result = await authService.login(loginUserDTO, req);

    // Logging the user login action
    logger.info(`User logined: ${result}`);

    res.status(200).json({
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
