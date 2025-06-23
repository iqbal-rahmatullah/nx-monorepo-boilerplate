import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';
import { IAuthService } from './IAuthService';
import { IAuthRepository } from '../repository/IAuthRepository';
import { AuthRepository } from '../repository/AuthRepository';
import { BadRequestException, ConflictException } from '@stores/shared';
import { compare, hash } from 'bcryptjs';
import { LoginUserDTO } from '../dto/login_user_dto';
import { JwtService } from '../jwt/jwt';
import { Request } from 'express';
import { InsertSessionDTO } from '../dto/insert_session_dto';

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }
  async login(data: LoginUserDTO, req: Request): Promise<string> {
    const findUserByEmail = await this.authRepository.findByEmail(data.email);

    // Check if user with the given email exists
    if (!findUserByEmail) {
      throw new BadRequestException('User with this email does not exist', {});
    }

    const isPasswordValid = await compare(
      data.password,
      findUserByEmail.hashedPassword
    );

    // Validate password
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password', {});
    }

    // Generate JWT token
    const token = await JwtService.generateToken(findUserByEmail);

    // Insert session into database
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const userAgent = req.headers['user-agent'];

    const sessionDTO = new InsertSessionDTO({
      userId: findUserByEmail.id,
      token,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userAgent: userAgent as string,
      ipAddress: ipAddress as string,
    });
    await this.authRepository.insertSession(sessionDTO);

    return token;
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
