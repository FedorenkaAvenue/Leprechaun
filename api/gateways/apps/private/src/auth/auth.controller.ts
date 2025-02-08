import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";

import AuthService from "./auth.service";
import { AuthJWTMapInterceptor } from "@core/auth/auth.interceptor";
import { AuthSignInDTO, AuthSuccessDTO } from "@core/auth/auth.dto";

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
    constructor(private readonly authPrivateService: AuthService) { }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FilesInterceptor(''), AuthJWTMapInterceptor)
    @ApiOperation({ summary: 'sign in' })
    @ApiOkResponse({ type: AuthSuccessDTO })
    @ApiNotFoundResponse({ description: 'invalid credentials' })
    private signIn(
        @Body(new ValidationPipe({ transform: true })) body: AuthSignInDTO,
    ): Promise<AuthSuccessDTO> {
        return this.authPrivateService.signIn({ ...body });
    }
}
