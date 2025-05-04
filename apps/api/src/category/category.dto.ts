import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsNotEmptyObject, IsNumberString, IsObject, IsOptional, IsString, ValidateNested, IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { TransDTO } from '@core/trans/trans.dto';
import { PropertyGroupI } from '@core/propertyGroup/propertyGroup.interface';

export class CategoryCreateDTO {
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
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @ApiProperty({
        type: 'array',
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
    comment: string | null;
}

export class CategoryUpdateDTO implements CategoryCreateDTO {
    @IsOptional()
    @IsString()
    @ApiProperty()
    url: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @ApiProperty({
        type: 'array',
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
    comment: string | null;
}

export class Category extends CategoryCreateDTO {
    constructor({ url, title, is_public, propertygroups, comment }: CategoryCreateDTO) {
        super();
        this.url = url;
        this.title = title;
        this.is_public = is_public;
        this.comment = comment || null;
        // TODO
        // @ts-ignore for table relations
        this.propertygroups = propertygroups ? propertygroups.map(groupId => ({ id: Number(groupId) })) : null;
    }
}
