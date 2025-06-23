import { User } from '@prisma/client';

export interface IUserRepository {
  getDetailUser(
    userId: string
  ): Promise<Omit<User, 'hashedPassword' | 'deletedAt'>>;
}
