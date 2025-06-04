import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
// import { Request } from "express";

import AuthService from "./auth.service";
import { AuthSignInDTO, AuthSuccessDTO } from "./auth.dto";
// import { AuthJWTRefreshGuard } from "./auth.guard";
import { AuthJWTMapInterceptor } from "./auth.interceptor";
import { FilesInterceptor } from "@nestjs/platform-express/multer";

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FilesInterceptor(''), AuthJWTMapInterceptor)
    @ApiOperation({ summary: 'sign in' })
    @ApiOkResponse({ type: AuthSuccessDTO })
    @ApiNotFoundResponse({ description: 'invalid credentials' })
    private signIn(
        @Body(new ValidationPipe({ transform: true })) body: AuthSignInDTO,
    ): Promise<AuthSuccessDTO> {
        return this.authService.signIn({ ...body });
    }

    // @Get('/refresh')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthJWTRefreshGuard)
    // @UseInterceptors(AuthJWTMapInterceptor)
    // @ApiOperation({ summary: 'refresh access token and get new tokens' })
    // @ApiOkResponse({ type: AuthSuccessDTO })
    // @ApiUnauthorizedResponse({ description: 'refresh token is no longer valid' })
    // private async refreshToken(@Req() req: Request): Promise<JWTSuccessTokensI> {
    //     console.log(req.cookies);
    //     console.log(req.signedCookies);

    //     return await this.authService.refreshAccessToken('');
    // }

    // @Get('signout')
    // @ApiOperation({ summary: 'sign out, destroy tokens' })
    // private async signOut() {
    //     return 'TODO';
    // }
}
