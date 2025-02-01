import { UserI } from "./User";

export type JWTPayloadI = Pick<UserI, 'id' | 'role'>

export interface JWTSuccessTokensI {
    accessToken: string
    refreshToken: string
}
