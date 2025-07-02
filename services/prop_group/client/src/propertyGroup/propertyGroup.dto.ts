import { PropertyGroupCU } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PropertyGroupCreateDTO implements Omit<PropertyGroupCU, 'title'> {
    @IsNotEmpty()
    @IsString()
    altName: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean;

    @IsOptional()
    @IsString()
    comment: string;
}

export class PropertyGroupUpdateDTO implements Omit<PropertyGroupCU, 'title'> {
    @IsOptional()
    @IsString()
    altName: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean;

    @IsOptional()
    @IsString()
    comment: string;
}
