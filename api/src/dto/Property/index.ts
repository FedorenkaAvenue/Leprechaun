import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { IProperty } from '@interfaces/Property';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

export class CreatePropertyDTO implements IProperty {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: 'number', description: 'property group ID' })
    property_group: IPropertyGroup;

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
