import { authPrisma } from '@stores/shared';
import { IAuthRepository } from './IAuthRepository';
import { User } from '@prisma/client';
import { RegisterUserDTO } from '../dto/register_user_dto';
import { InsertSessionDTO } from '../dto/insert_session_dto';

export class AuthRepository implements IAuthRepository {
  async updateOrInsertSession(userId: string, token: string): Promise<void> {
    await authPrisma.session.upsert({
      where: { userId: userId, token: token },
      update: {
        lastUsedAt: new Date(),
      },
      create: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastUsedAt: new Date(),
      },
    });
  }

  async insertSession(data: InsertSessionDTO): Promise<void> {
    await authPrisma.session.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiredAt,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
      },
    });
  }

  async createUser(data: RegisterUserDTO): Promise<User> {
    return await authPrisma.user.create({
      data: {
        email: data.email,
        hashedPassword: data.hashedPassword,
        fullName: data.fullName,
        address: data.address,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await authPrisma.user.findUnique({
      where: { email },
    });
  }
}
