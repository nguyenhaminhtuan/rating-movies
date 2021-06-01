import { UserRole } from '../../users/users.enum';

export interface JwtPayload {
  sub?: string;
  email: string;
  role: UserRole;
}
