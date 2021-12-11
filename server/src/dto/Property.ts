import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { IProperty } from '@interfaces/Property';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

export class CreatePropertyDTO implements IProperty {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: 'number', description: 'property group ID' })
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

export class CreatePropertyDTOConstructor extends CreatePropertyDTO {
    constructor({ title, alt_name, comment, property_group }: CreatePropertyDTO) {
        super();
        this.property_group = property_group;
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}
