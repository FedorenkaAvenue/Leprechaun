import { ApiProperty } from "@nestjs/swagger"
import { AuthJWT, SignInParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/auth';

export class AuthSignInDTO implements SignInParams {
    @ApiProperty({ required: true })
    email: string

    @ApiProperty({ required: true })
    password: string
}

export class AuthSuccessDTO implements Omit<AuthJWT, 'refreshToken'> {
    @ApiProperty()
    accessToken: string;
}
