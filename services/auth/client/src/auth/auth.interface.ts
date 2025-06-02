import { User } from "../user/user.interface";

export interface SignInDTO {
    email: string;
    password: string;
}

export interface AuthSuccessDTO {
    accessToken: string;
    refreshToken: string;
}

export type JWTPayload = Pick<User, 'id' | 'role'>

export interface JWTSuccessTokens {
    accessToken: string
    refreshToken: string
}
