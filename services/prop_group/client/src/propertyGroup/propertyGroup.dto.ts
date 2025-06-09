import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PropertyGroupCU } from 'gen/ts/prop_group';

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
