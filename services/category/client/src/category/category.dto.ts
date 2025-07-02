import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { CategoryCU } from '@fedorenkaavenue/leprechaun_lib_entities/server/category';
import { File } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';
import { TransData } from '@fedorenkaavenue/leprechaun_lib_entities/server/trans';

export class CategoryCreateDTO implements CategoryCU {
    title: TransData;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsOptional()
    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    icon?: File;

    @IsOptional()
    @IsNumber({}, { each: true })
    propertyGroups: number[];

    @IsOptional()
    @IsString()
    comment: string;
}

export class CategoryUpdateDTO implements Partial<CategoryCU> {
    @IsOptional()
    @IsString()
    url?: string;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @IsOptional()
    icon?: File;

    @IsOptional()
    @IsNumber({}, { each: true })
    propertyGroups?: number[];

    @IsOptional()
    @IsString()
    comment?: string;
}
