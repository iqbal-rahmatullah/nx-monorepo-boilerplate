import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';
import { IAuthService } from './IAuthService';
import { IAuthRepository } from '../repository/IAuthRepository';
import { AuthRepository } from '../repository/AuthRepository';
import { BadRequestException, ConflictException } from '@stores/shared';
import { hash } from 'bcryptjs';

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async registerUser(data: RegisterUserDTO): Promise<User> {
    const findUserByEmail = await this.authRepository.findByEmail(data.email);

    // Check if user with the same email already exists
    if (findUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match', {});
    }

    // Hash the password before saving
    data.hashedPassword = await hash(data.password, 10);

    return await this.authRepository.createUser(data);
  }
}
