import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

export const USER_ROLE_KEY = 'role';
export const UserRoleDecorator = (role: UserRole) => SetMetadata(USER_ROLE_KEY, role);
