import { AuthService } from './auth.service';
import { AuthServiceController, AuthJWT, SignInDTO, AuthServiceControllerMethods } from 'gen/ts/auth';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
    constructor(private readonly authService: AuthService) { }

    async signIn(payload: SignInDTO): Promise<AuthJWT> {
        return await this.authService.sigIn(payload);
    }
}
