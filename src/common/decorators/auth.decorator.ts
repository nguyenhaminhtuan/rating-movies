import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../../users/users.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard, ROLES_KEY } from '../../auth/roles.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
