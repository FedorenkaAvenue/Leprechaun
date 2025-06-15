import { UserRole } from "gen/user";

export type UserDTO = Partial<Pick<User, 'id' | 'email'>>;

export interface User {
    id: string
    role: UserRole
    email: string
    password: string
}
