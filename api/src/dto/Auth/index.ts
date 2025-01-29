import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

import { UserDTO } from "@dto/User";

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

export class AuthSuccessDTO {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    user: UserDTO
}
