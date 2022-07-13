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
