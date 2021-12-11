import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { IPropertyGroup } from '@interfaces/PropertyGroup';
import { ICategory, ICategoryPublic } from '@interfaces/Category';
import { CategoryBaseEntity } from '@entities/Category';

export class CreateCategoryDTO implements ICategory {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @ApiProperty({
        type: 'file',
        required: false,
        description: 'only SVG extension',
        default: null
    })
    icon: string;

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the property groups ID',
        isArray: true,
        default: []
    })
    property_groups: IPropertyGroup[];

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreateCategoryDTOСonstructor extends CreateCategoryDTO {
    constructor({ url, title, is_public, property_groups, comment }: CreateCategoryDTO) {        
        super();
        this.url = url;
        this.title = title;
        this.is_public = is_public;
        this.comment = comment || null;
        // @ts-ignore for table relations
        this.property_groups = property_groups
            ? property_groups.map(groupId => ({ id: Number(groupId) }))
            : null;
    }
}

export class CategoryPublicDTO extends CategoryBaseEntity implements ICategoryPublic {
    constructor({ id, title, url, icon }: ICategory) {
        super();
        this.id = id;
        this.title = title;
        this.url = url;
        this.icon = icon;
    }
}
