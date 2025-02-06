import { UserI } from "../user/user.interface"

export type JWTPayloadI = Pick<UserI, 'id' | 'role'>

export interface JWTSuccessTokensI {
    accessToken: string
    refreshToken: string
}
