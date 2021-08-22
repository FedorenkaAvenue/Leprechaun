import { ApiProperty } from "@nestjs/swagger";

import { IFilterGroup } from "@modules/filter/index.interface";
import { ICategory } from "./index.interface";

export class CreateCategoryDTO implements ICategory {
    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({
        type: 'file',
        required: false,
        description: 'only SVG extension'
    })
    icon: string;

    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the filter groups ID',
        isArray: true
    })
    // ! хуйня из-за добавления группы фильтров
    filterGroups: IFilterGroup[] | any;
}

export class UpdateCategoryDTO implements ICategory {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: false })
    url: string;

    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({
        required: false,
        type: 'file',
        description: 'only SVG extension'
    })
    icon: string;

    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the filter groups ID',
        isArray: true
    })
    filterGroups: IFilterGroup[];
}
