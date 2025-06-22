import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: RegisterUserDTO): Promise<User>;
}
