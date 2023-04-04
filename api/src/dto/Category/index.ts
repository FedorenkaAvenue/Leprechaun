import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumberString,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { CategoryI } from '@interfaces/Category';
import { TransDTO } from '@dto/Trans';

export class CreateCategoryDTO implements CategoryI {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    url: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @ApiProperty({
        type: 'file',
        required: false,
        description: 'only SVG extension',
        default: null,
    })
    icon: string;

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the property groups ID',
        isArray: true,
        default: [],
    })
    propertygroups: PropertyGroupI[];

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}
