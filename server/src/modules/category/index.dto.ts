import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

import { IPropertyGroup } from "@modules/property/index.interface";
import { ICategory } from "./index.interface";

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
    isPublic: boolean;

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
        description: 'array of the filter groups ID',
        isArray: true
    })
    filterGroups: IPropertyGroup[];
}

export class CreateCategoryDTOСonstructor extends CreateCategoryDTO {
    constructor({ url, title, isPublic, filterGroups }: CreateCategoryDTO) {
        super();
        this.url = url;
        this.title = title;
        this.isPublic = isPublic;
        // @ts-ignore for table relations
        this.filterGroups = filterGroups ? filterGroups.map((filterId: number ) => ({ id: filterId })) : null;
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
