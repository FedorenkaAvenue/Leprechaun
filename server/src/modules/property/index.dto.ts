import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { FilterOptionType, IProperty, IPropertyGroup } from "./index.interface";

export class CreatePropertyGroupDTO implements IPropertyGroup {
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

export class CreatePropertyGroupDTOConstructor extends CreatePropertyGroupDTO {
    constructor({ title, type, altName, comment }: CreatePropertyGroupDTO) {
        super();
        this.title = title;
        this.type = type;
        this.altName = altName;
        this.comment = comment || null;
    }
}

export class CreatePropertyDTO implements IProperty {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: 'number',
        description: 'filter group ID'
    })
    propertyGroup: IPropertyGroup;

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

export class CreateFilterDTOConstructor extends CreatePropertyDTO {
    constructor({ title, altName, comment, propertyGroup }: CreatePropertyDTO) {
        super();
        this.propertyGroup = propertyGroup;
        this.title = title;
        this.altName = altName;
        this.comment = comment || null;
    }
}
