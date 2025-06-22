import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';

export interface IAuthService {
  registerUser(data: RegisterUserDTO): Promise<User>;
}
