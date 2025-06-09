import { ApiProperty } from '@nestjs/swagger';

import { TransData } from '@gen/trans';

export class TransSchema implements TransData {
    @ApiProperty({ required: false })
    en: string;

    @ApiProperty({ required: false })
    ua: string;

    @ApiProperty({ required: false })
    ru: string;
}
