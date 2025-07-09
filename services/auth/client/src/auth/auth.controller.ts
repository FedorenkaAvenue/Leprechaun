import { Observable } from 'rxjs';
import {
    AuthServiceController, AuthJWT, SignInParams, AuthServiceControllerMethods,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/auth';

import { AuthService } from './auth.service';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) { }

    signIn(payload: SignInParams): Observable<AuthJWT> {
        return this.authService.sigIn(payload);
    }
}
