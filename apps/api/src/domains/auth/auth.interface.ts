import { User } from "@gen/user";

export type JWTPayloadI = Pick<User, 'id' | 'role'>
