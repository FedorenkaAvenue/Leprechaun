import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LanguagesI } from './trans.interface';

export class TransDTO implements LanguagesI {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    en: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    ua: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    ru: string;
}
