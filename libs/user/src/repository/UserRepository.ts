import { User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { userPrisma } from '@stores/shared';

export class UserRepository implements IUserRepository {
  async getDetailUser(
    userId: string
  ): Promise<Omit<User, 'hashedPassword' | 'deletedAt'>> {
    return await userPrisma.user.findFirst({
      omit: {
        hashedPassword: true,
        deletedAt: true,
      },
      where: {
        id: userId,
      },
    });
  }
}
