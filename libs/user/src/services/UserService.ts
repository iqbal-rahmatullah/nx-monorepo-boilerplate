import { User } from '@prisma/client';
import { IUserService } from './IUserService';
import { IUserRepository } from '../repository/IUserRepository';
import { UserRepository } from '../repository/UserRepository';

export class UserService implements IUserService {
  userRepository: IUserRepository = new UserRepository();

  async getDetailUser(
    userId: string
  ): Promise<Omit<User, 'hashedPassword' | 'deletedAt'>> {
    const findUser = await this.userRepository.getDetailUser(userId);

    if (!findUser) {
      throw new Error('User not found');
    }

    return findUser;
  }
}
