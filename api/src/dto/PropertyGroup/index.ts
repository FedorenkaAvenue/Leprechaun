import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { PropertyGroupI, PropertyGroupPublicI } from '@interfaces/PropertyGroup';
import { PropertyEntity } from '@entities/Property';
import { Type } from 'class-transformer';
import { TransDTO } from '@dto/Trans';
import { PropertyPublic } from '@dto/Property/constructor';

export class CreatePropertyGroupDTO implements PropertyGroupI {
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
    @IsBoolean()
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

    @ApiProperty({ type: () => PropertyPublic, isArray: true })
    properties: PropertyEntity[];
}
