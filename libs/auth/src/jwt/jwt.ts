import { User } from '@prisma/client';
import { config } from '@stores/shared';
import { sign, verify } from 'jsonwebtoken';

export class JwtService {
  static async generateToken(
    payload: Omit<User, 'hashedPassword'>
  ): Promise<string> {
    return sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  static async verifyToken(token: string) {
    try {
      return verify(token, config.JWT_SECRET_KEY);
    } catch {
      return null;
    }
  }
}
