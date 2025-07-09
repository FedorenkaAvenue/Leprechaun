import { ApiProperty } from '@nestjs/swagger';
import { TransData } from '@fedorenkaavenue/leprechaun_lib_entities/server/trans';

export class TransSchema implements TransData {
    @ApiProperty({ required: false })
    en: string;

    @ApiProperty({ required: false })
    ua: string;

    @ApiProperty({ required: false })
    ru: string;
}
