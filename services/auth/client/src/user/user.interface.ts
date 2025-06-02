import { Observable } from "rxjs";

import { UserRole } from "./user.enum";
import { SignInDTO } from "../auth/auth.interface";

export interface UserGRPCService {
    findOne(payload: SignInDTO): Observable<User>;
}

export interface User {
    id: string
    role: UserRole
    email: string
    password: string
}
