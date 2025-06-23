import { Request } from 'express';
import { User } from './path/to/user/model';

export interface AuthRequest extends Request {
  user?: User;
}
