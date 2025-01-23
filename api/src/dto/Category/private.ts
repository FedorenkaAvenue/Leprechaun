import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsObject, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { TransDTO } from '@dto/Trans';

export class CreateCategoryDTO {
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
    comment: string | null;
}

export class Category extends CreateCategoryDTO {
    constructor({ url, title, is_public, propertygroups, comment }: CreateCategoryDTO) {
        super();
        this.url = url;
        this.title = title;
        this.is_public = typeof is_public === 'string' && is_public === 'true';
        this.comment = comment || null;
        // TODO
        // @ts-ignore for table relations
        this.propertygroups = propertygroups ? propertygroups.map(groupId => ({ id: Number(groupId) })) : null;
    }
}
