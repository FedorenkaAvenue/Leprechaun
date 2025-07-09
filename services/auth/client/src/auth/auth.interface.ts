import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

export type JWTPayload = Pick<User, 'id' | 'role'>

export interface JWTSuccessTokens {
    accessToken: string
    refreshToken: string
}
