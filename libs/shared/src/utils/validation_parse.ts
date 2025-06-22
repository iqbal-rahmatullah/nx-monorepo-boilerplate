import { ZodSchema } from 'zod';
import { BadRequestException } from '../errors';

export class ValidationParse {
  static validate<T>(schema: ZodSchema, data: T): T {
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new BadRequestException(
        'Validation failed ',
        result.error.errors.map((error) => {
          return {
            message: error.message,
            path: error.path,
          };
        })
      );
    }

    return result.data;
  }
}
