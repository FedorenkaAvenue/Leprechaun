import { PropertyCU } from '@fedorenkaavenue/leprechaun_lib_entities/server/property';
import { PropertyGroup } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
