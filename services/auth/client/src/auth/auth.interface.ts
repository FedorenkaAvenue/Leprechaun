import { User } from "gen/user";

export type JWTPayload = Pick<User, 'id' | 'role'>

export interface JWTSuccessTokens {
    accessToken: string
    refreshToken: string
}
