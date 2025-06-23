import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';
import { InsertSessionDTO } from '../dto/insert_session_dto';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: RegisterUserDTO): Promise<User>;
  insertSession(data: InsertSessionDTO): Promise<void>;
  updateOrInsertSession(userId: string, token: string): Promise<void>;
}
