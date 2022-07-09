import { ApiProperty } from '@nestjs/swagger';

import { ILabel } from '@interfaces/Label';
import { LabelType } from 'enums/Label';

export class LabelDTO implements ILabel {
    @ApiProperty({ enum: LabelType })
    type: LabelType;

    @ApiProperty({ required: false })
    value: string;

    constructor(type: ILabel['type'], value: ILabel['value']) {
        this.type = type;
        this.value = value || null;
    }
}
