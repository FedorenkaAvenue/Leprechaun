import { ApiProperty } from '@nestjs/swagger';

import { Trans, TransCU } from '@gen/trans';

export class TransSchema implements Trans {
    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    en: string;

    @ApiProperty({ required: false })
    ua: string;

    @ApiProperty({ required: false })
    ru: string;
}

export class TransCUSchema implements TransCU {
    @ApiProperty({ required: true })
    en: string;

    @ApiProperty({ required: true })
    ua: string;

    @ApiProperty({ required: true })
    ru: string;
}
