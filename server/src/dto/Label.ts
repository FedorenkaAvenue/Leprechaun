import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ILabel, LabelType } from '@interfaces/Label';

export class CreateLabelDTO implements ILabel {
    @IsNotEmpty()
    @IsEnum(LabelType)
    type: LabelType;

    @IsOptional()
    @IsString()
    value: string;
}

export class CreateLabelDTOConstructor extends CreateLabelDTO {
    constructor({ type, value }: CreateLabelDTO) {
        super();
        this.type = type;
        this.value = value || null;
    }
}
