import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { IPropertyGroup } from '@interfaces/PropertyGroup';
import { ICategory } from '@interfaces/Category';

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

// export class UpdateCategoryDTO implements ICategory {
//     @ApiProperty({ required: true })
//     id: number;

//     @ApiProperty({ required: false })
//     url: string;

//     @ApiProperty({ required: false })
//     title: string;

//     @ApiProperty({ required: false })
//     isPublic: boolean;

//     @ApiProperty({
//         required: false,
//         type: 'file',
//         description: 'only SVG extension'
//     })
//     icon: string;

//     @ApiProperty({
//         required: false,
//         type: 'number',
//         description: 'array of the filter groups ID',
//         isArray: true
//     })
//     filterGroups: IFilterGroup[];
// }
