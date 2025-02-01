import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

import { JWTSuccessTokensI } from "@interfaces/JWT";

export class AuthSignInDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string
}

export class AuthSuccessDTO implements Omit<JWTSuccessTokensI, 'refreshToken'> {
    @ApiProperty()
    accessToken: string;
}
