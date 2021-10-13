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
}

export class CreateLabelDTOConstructor extends CreateLabelDTO {
    constructor({ type, value }: CreateLabelDTO) {
        super();
        this.type = type;
        this.value = value || null;
    }
}
