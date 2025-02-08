import { SetMetadata } from '@nestjs/common';

import { UserRole } from './user.enum';

export const USER_ROLE_KEY = 'role';
export const UserRoleDecorator = (role: UserRole) => SetMetadata(USER_ROLE_KEY, role);
