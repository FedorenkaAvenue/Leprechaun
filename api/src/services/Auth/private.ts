import { Injectable, NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual } from "typeorm";

import { AuthSignInDTO } from "@dto/Auth";
import AuthService from ".";
import { JWTSuccessTokensI } from "@interfaces/JWT";
import { UserRole } from "@enums/User";

@Injectable()
export default class AuthPrivateService extends AuthService {
    public async signIn({ email, password }: AuthSignInDTO): Promise<JWTSuccessTokensI> {
        const user = await this.userService.getUserWhere({ email, role: MoreThanOrEqual(UserRole.CUSTOMER) });

        if (!user || !await this.cryptoService.checkHash(password, user.password)) {
            throw new NotFoundException('invalid credentials');
        }

        return await this.genAuthTokens(user);
    }
}
