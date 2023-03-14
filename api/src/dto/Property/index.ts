import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { Type } from 'class-transformer';
import { TransDTO } from '@dto/Trans';

export class CreatePropertyDTO implements PropertyI {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: 'number', description: 'property group ID' })
    propertygroup: PropertyGroupI;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class PropertyPublicDTO implements PropertyPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;
}
