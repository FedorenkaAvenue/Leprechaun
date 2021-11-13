import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ILabel, LabelType } from '@interfaces/Label';

export class CreateLabelDTO implements ILabel {
    @IsNotEmpty()
    @IsEnum(LabelType)
    @ApiProperty()
    type: LabelType;

    @IsOptional()
    @IsString()
    @ApiProperty({ enum: LabelType })
    value: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    comment: string;
}

export class CreateLabelDTOConstructor extends CreateLabelDTO {
    constructor({ type, value, comment }: CreateLabelDTO) {
        super();
        this.type = type;
        this.value = value || null;
        this.comment = comment || null;
    }
}
