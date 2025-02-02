import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Request } from "express";

import { AuthSuccessDTO } from "@dto/Auth";
import AuthService from "@services/Auth";
import { AuthJWTMapInterceptor } from "@interceptors/Auth";
import { JWTSuccessTokensI } from "@interfaces/JWT";
import { AuthJWTRefreshGuard } from "@guards/Auth";

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('/refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthJWTRefreshGuard)
    @UseInterceptors(AuthJWTMapInterceptor)
    @ApiOperation({ summary: 'refresh access token and get new tokens' })
    @ApiOkResponse({ type: AuthSuccessDTO })
    @ApiUnauthorizedResponse({ description: 'refresh token is no longer valid' })
    private async refreshToken(@Req() req: Request): Promise<JWTSuccessTokensI> {
        console.log(req.cookies);
        console.log(req.signedCookies);

        return await this.authService.refreshAccessToken('');
    }

    @Get('signout')
    @ApiOperation({ summary: 'sign out, destroy tokens' })
    private async signOut() {
        return 'TODO';
    }
}
