import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

export class CreatePropertyDTO implements PropertyI {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: 'number', description: 'property group ID' })
    property_group: PropertyGroupI;

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

// export class PropertyPublicDTO implements PropertyPublicI {
//     @ApiProperty()
//     id: number;

//     @ApiProperty()
//     title: string;

//     @ApiProperty()
//     alt_name: string;

//     @ApiProperty()
//     property_group: PropertyGroupEntity;
// }
