import { ApiProperty } from "@nestjs/swagger";

import { FilterOptionType, IFilter, IFilterGroup } from "./index.interface";

export class CreateFilterGroupDTO implements IFilterGroup {
    @ApiProperty()
    title: string;

    @ApiProperty({ enum: FilterOptionType })
    type: FilterOptionType;

    @ApiProperty()
    altName: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({ required: false })
    comment: string;
}

export class CreateFilterDTO implements IFilter {
    @ApiProperty({
        type: 'number',
        description: 'filter group ID'
    })
    filterGroup: IFilterGroup;

    @ApiProperty()
    title: string;

    @ApiProperty()
    altName: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({ required: false })
    comment: string;
}
