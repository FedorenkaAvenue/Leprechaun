import { ApiProperty } from '@nestjs/swagger';

import { ILabel } from '@interfaces/Label';
import { LabelType } from 'enums/Label';

export class LabelDTO implements ILabel {
    @ApiProperty({ enum: LabelType, required: false })
    type: LabelType;

    @ApiProperty({ required: false, nullable: true })
    value?: string;

    constructor(type: ILabel['type'], value?: ILabel['value']) {
        this.type = type;
        this.value = value || null;
    }
}
