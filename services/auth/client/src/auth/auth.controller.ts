import { AuthService } from './auth.service';
import { AuthServiceController, AuthJWT, SignInParams, AuthServiceControllerMethods } from 'gen/ts/auth';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) { }

    async signIn(payload: SignInParams): Promise<AuthJWT> {
        return await this.authService.sigIn(payload);
    }
}
