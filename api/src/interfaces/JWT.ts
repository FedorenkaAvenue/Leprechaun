import { UserI } from "./User";

export type JWTPayloadI = Pick<UserI, 'id' | 'role'>
