import { Observable } from "rxjs";

import { UserI } from "../user/user.interface"
import { AuthSignInDTO } from "./auth.dto";

export type JWTPayloadI = Pick<UserI, 'id' | 'role'>

export interface JWTSuccessTokensI {
    accessToken: string
    refreshToken: string
}

export interface AuthServiceClient {
    SignIn(data: AuthSignInDTO): Observable<JWTSuccessTokensI>;
}
