import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TransI } from '@interfaces/Trans';

export class TransDTO implements TransI {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    en: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ua: string;
}
