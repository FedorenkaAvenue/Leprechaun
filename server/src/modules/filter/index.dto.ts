import { BadRequestException } from "@nestjs/common";
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

    constructor({ title, type, altName, isPublic, comment }: CreateFilterGroupDTO) {
        if (!title || !type || !altName) throw new BadRequestException();

        this.title = title;
        this.type = type;
        this.altName = altName;
        this.isPublic = isPublic;
        this.comment = comment || null;
    }
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

    constructor({ title, altName, isPublic, comment, filterGroup }: CreateFilterDTO) {
        if (!title || !altName || !filterGroup) throw new BadRequestException();

        this.filterGroup = filterGroup;
        this.title = title;
        this.altName = altName;
        this.isPublic = isPublic;
        this.comment = comment || null;
    }
}
