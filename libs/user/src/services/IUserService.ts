import { User } from '@prisma/client';

export interface IUserService {
  getDetailUser(
    userId: string
  ): Promise<Omit<User, 'hashedPassword' | 'deletedAt'>>;
}
