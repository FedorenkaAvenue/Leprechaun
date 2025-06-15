import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PropertyCU } from 'gen/_property';
import { PropertyGroup } from 'gen/property_group';

export class CreatePropertyDTO implements Omit<PropertyCU, 'title'> {
    @IsNotEmpty()
    @IsNumber()
    propertyGroup: PropertyGroup['id'];

    @IsNotEmpty()
    @IsString()
    altName: string;

    @IsOptional()
    @IsString()
    comment: string;
}
