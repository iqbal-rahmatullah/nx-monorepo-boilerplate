import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';
import { LoginUserDTO } from '../dto/login_user_dto';
import { Request } from 'express';

export interface IAuthService {
  registerUser(data: RegisterUserDTO): Promise<User>;
  login(data: LoginUserDTO, req: Request): Promise<string>;
}
