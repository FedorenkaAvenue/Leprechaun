import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";

import { AuthSignInDTO, AuthSuccessDTO } from "@dto/Auth";
import AuthService from "@services/Auth";

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FilesInterceptor(''))
    @ApiOperation({ summary: 'sign in' })
    @ApiOkResponse({ type: AuthSuccessDTO })
    private signIn(
        @Body(new ValidationPipe({ transform: true })) body: AuthSignInDTO,
    ): Promise<AuthSuccessDTO> {
        return this.authService.signIn({ ...body });
    }
}
