import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { IPropertyGroup } from '@interfaces/Property';
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
    @ApiProperty({ required: false })
    is_public: boolean;

    @IsOptional()
    @ApiProperty({
        type: 'file',
        required: false,
        description: 'only SVG extension'
    })
    icon: string;

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the property groups ID',
        isArray: true
    })
    property_groups: IPropertyGroup[];
}

export class CreateCategoryDTOСonstructor extends CreateCategoryDTO {
    constructor({ url, title, is_public, property_groups }: CreateCategoryDTO) {        
        super();
        this.url = url;
        this.title = title;
        this.is_public = is_public;
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
