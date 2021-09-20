import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { FilterOptionType, IFilter, IFilterGroup } from "./index.interface";

export class CreateFilterGroupDTO implements IFilterGroup {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsEnum(FilterOptionType)
    @ApiProperty({ enum: FilterOptionType })
    type: FilterOptionType;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    altName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    comment: string;
}

export class CreateFilterGroupDTOConstructor extends CreateFilterGroupDTO {
    constructor({ title, type, altName, comment }: CreateFilterGroupDTO) {
        super();
        this.title = title;
        this.type = type;
        this.altName = altName;
        this.comment = comment || null;
    }
}

export class CreateFilterDTO implements IFilter {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: 'number',
        description: 'filter group ID'
    })
    filterGroup: IFilterGroup;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    altName: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    comment: string;
}

export class CreateFilterDTOConstructor extends CreateFilterDTO {
    constructor({ title, altName, comment, filterGroup }: CreateFilterDTO) {
        super();
        this.filterGroup = filterGroup;
        this.title = title;
        this.altName = altName;
        this.comment = comment || null;
    }
}
