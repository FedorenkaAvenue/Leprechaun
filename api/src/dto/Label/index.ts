import { ApiProperty } from '@nestjs/swagger';

import { LabelI } from '@interfaces/Label';
import { LabelType } from 'enums/Label';

export class LabelDTO implements LabelI {
    @ApiProperty({ enum: LabelType, required: false })
    type: LabelType;

    @ApiProperty({ required: false, nullable: true })
    value: string;
}
