import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";

import { AuthSignInDTO, AuthSuccessDTO } from "@dto/Auth";
import AuthPrivateService from "@services/Auth/private";
import { AuthJWTMapInterceptor } from "@interceptors/Auth";

@Controller('adm/auth')
@ApiTags('Auth 🤵🏿‍♂️')
export default class AuthPrivateController {
    constructor(private readonly authPrivateService: AuthPrivateService) { }

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
