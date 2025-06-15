import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

import { CategoryCU } from 'gen/category';
import { File } from 'gen/common';
import { TransData } from 'gen/trans';

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
