import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PropertyGroupI, PropertyGroupPublicI } from '@interfaces/PropertyGroup';
import { PropertyEntity } from '@entities/Property';

export class CreatePropertyGroupDTO implements PropertyGroupI {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, description: 'visible property for ProductCard', default: false })
    is_primary: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class PropertyGroupPublicDTO implements PropertyGroupPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    @ApiProperty({ type: () => PropertyEntity, isArray: true })
    properties: PropertyEntity[];
}
