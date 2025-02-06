import { Injectable, NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual } from "typeorm";

import { AuthSignInDTO } from "@core/auth/auth.dto";
import { JWTSuccessTokensI } from "@core/auth/auth.interface";
import { UserRole } from "@core/user/user.enum";
import CryptoService from '@core/crypto/crypto.service';
import AuthCoreService from '@core/auth/auth.service';
import UserCoreService from "@core/user/user.service";

@Injectable()
export default class AuthService {
    constructor(
        private readonly cryptoService: CryptoService,
        private readonly authCoreService: AuthCoreService,
        private readonly userCoreService: UserCoreService,
    ) { }

    public async signIn({ email, password }: AuthSignInDTO): Promise<JWTSuccessTokensI> {
        const user = await this.userCoreService.getUserWhere({ email, role: MoreThanOrEqual(UserRole.CUSTOMER) });

        if (!user || !await this.cryptoService.checkHash(password, user.password)) {
            throw new NotFoundException('invalid credentials');
        }

        return await this.authCoreService.genAuthTokens(user);
    }
}
