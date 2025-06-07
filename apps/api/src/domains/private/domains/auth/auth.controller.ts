import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express/multer";

import { AuthJWTMapInterceptor } from "@common/auth/auth.interceptor";
import { AuthSignInDTO, AuthSuccessDTO } from "@common/auth/auth.dto";
import AuthService from "@common/auth/auth.service";

@Controller('auth')
@ApiTags('Auth')
export default class AuthPrivateController {
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
}
