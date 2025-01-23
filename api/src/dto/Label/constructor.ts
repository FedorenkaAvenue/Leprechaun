import { ApiProperty } from '@nestjs/swagger';

import { LabelI } from '@interfaces/Label';
import { LabelType } from '@enums/Label';

export class Label implements LabelI {
    @ApiProperty({ enum: LabelType, required: false })
    type: LabelType;

    @ApiProperty({ required: false, nullable: true })
    value: string | null;

    constructor(type: LabelI['type'], value?: LabelI['value']) {
        this.type = type;
        this.value = value || null;
    }
}
