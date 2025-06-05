import { ApiProperty } from '@nestjs/swagger';

import { Trans } from '@gen/trans';

export class TransSchemas implements Trans {
    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    en: string;

    @ApiProperty({ required: false })
    ua: string;

    @ApiProperty({ required: false })
    ru: string;
}
