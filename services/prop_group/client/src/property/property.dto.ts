import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { PropertyCU, PropertyGroup } from 'gen/ts/prop_group';

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
