import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PropertyGroupOptionType, IProperty, IPropertyGroup } from '@interfaces/Property';

export class CreatePropertyGroupDTO implements IPropertyGroup {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsEnum(PropertyGroupOptionType)
    @ApiProperty({ enum: PropertyGroupOptionType })
    type: PropertyGroupOptionType;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreatePropertyGroupDTOConstructor extends CreatePropertyGroupDTO {
    constructor({ title, type, alt_name, comment }: CreatePropertyGroupDTO) {
        super();
        this.title = title;
        this.type = type;
        this.alt_name = alt_name;
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
    property_group: IPropertyGroup;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreateFilterDTOConstructor extends CreatePropertyDTO {
    constructor({ title, alt_name, comment, property_group }: CreatePropertyDTO) {
        super();
        this.property_group = property_group;
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}
