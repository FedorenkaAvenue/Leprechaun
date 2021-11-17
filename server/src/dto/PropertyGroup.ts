import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IPropertyGroup } from '@interfaces/PropertyGroup';
import { FilterType } from '@interfaces/Filter';

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
    @IsEnum(FilterType)
    @ApiProperty({
        enum: FilterType,
        default: FilterType.List,
        required: false
    })
    type: FilterType;

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
