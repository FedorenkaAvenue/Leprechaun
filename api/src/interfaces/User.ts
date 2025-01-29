import { UserRole } from '@enums/User';

export interface UserI {
    id: string
    role: UserRole
    email: string | null
    password: string
}

export type UserDataI = Omit<UserI, 'password'>;
