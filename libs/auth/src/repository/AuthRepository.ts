import { userPrisma } from '@stores/shared';
import { IAuthRepository } from './IAuthRepository';
import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';

export class AuthRepository implements IAuthRepository {
  async createUser(data: RegisterUserDTO): Promise<User> {
    return await userPrisma.user.create({
      data: {
        email: data.email,
        hashedPassword: data.hashedPassword,
        fullName: data.fullName,
        address: data.address,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await userPrisma.user.findUnique({
      where: { email },
    });
  }
}
