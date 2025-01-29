import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import UserService from "@services/User";
import { AuthSignInDTO, AuthSuccessDTO } from "@dto/Auth";
import CryptoService from "@services/Crypto";
import { JWTPayloadI } from "@interfaces/JWT";
import { UserDTO } from "@dto/User";

@Injectable()
export default class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private jwtService: JwtService,
    ) { }

    public async signIn({ email, password }: AuthSignInDTO): Promise<AuthSuccessDTO> {
        const user = await this.userService.getUser(email);

        if (
            !user
            || user.password !== password
            // || !await this.cryptoService.checkHash(password, user.password)
        ) throw new UnauthorizedException('invalid credentials');

        const payload: JWTPayloadI = { id: user.id, role: user.role }; // ! must be literal object

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: new UserDTO(user),
        };
    }
}
