import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthServiceController, AuthJWT, SignInParams, AuthServiceControllerMethods } from 'gen/ts/auth';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) { }

    signIn(payload: SignInParams): Observable<AuthJWT> {
        return this.authService.sigIn(payload);
    }
}
