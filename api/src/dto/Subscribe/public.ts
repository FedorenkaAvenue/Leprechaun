import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class SubscribeProductStatusDTO {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description: 'product ID', required: true })
    productId: string

    @IsEmail()
    @IsOptional()
    @ApiProperty({ description: 'e-mail. required if user is not sign-ed', required: false })
    email: string
}
