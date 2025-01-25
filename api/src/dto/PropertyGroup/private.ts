import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { TransDTO } from '@dto/Trans';
import { QueriesCommon } from '@dto/Queries';
import { PropertyGroupI, PropertyGroupPublicI } from '@interfaces/PropertyGroup';
import { OptionI, OptionPublicI } from '@interfaces/Option';
import { PropertyPublic } from '@dto/Property/public';

export class PropertyGroupCreateDTO {
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

export class PropertyGroupUpdateDTO implements PropertyGroupCreateDTO {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
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

export class PropertyGroupPublic implements PropertyGroupPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    constructor({ id, title, alt_name }: PropertyGroupI, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}

export class OptionPublic extends PropertyGroupPublic implements OptionPublicI {
    @ApiProperty({ isArray: true })
    properties: PropertyPublic[];

    constructor({ properties, ...propGroup }: OptionI, lang: QueriesCommon['lang']) {
        super(propGroup, lang);
        this.properties = properties.map(prop => new PropertyPublic(prop, lang));
    }
}
