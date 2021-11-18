import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IPropertyGroup } from '@interfaces/PropertyGroup';

export class CreatePropertyGroupDTO implements IPropertyGroup {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreatePropertyGroupDTOConstructor extends CreatePropertyGroupDTO {
    constructor({ title, alt_name, comment }: CreatePropertyGroupDTO) {
        super();
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}
