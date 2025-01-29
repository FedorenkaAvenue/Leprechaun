import { User } from "../model/interfaces"

export type SignInUserDTO = FormData

export interface AuthSuccessDTO {
    access_token: string
    user: User
}
