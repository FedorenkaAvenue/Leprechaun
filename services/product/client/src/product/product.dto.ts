import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { Product, ProductCU, ProductPrice, ProductStatus } from "gen/product";
import { File } from 'gen/common';
import { Category } from 'gen/category';
import { Property } from 'gen/property';

export class ProductCreateDTO implements Omit<ProductCU, 'title' | 'description'> {
    @IsNotEmpty()
    @IsNumber()
    priceCurrent: ProductPrice['current'];

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value === '' ? null : Number(value))
    priceOld: ProductPrice['old'];

    @IsOptional()
    @IsBoolean()
    isPublic: Product['isPublic'];

    @IsOptional()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsOptional()
    @IsNumber()
    rating: Product['rating'];

    @IsNotEmpty()
    @IsNumber()
    category: number;

    @IsOptional()
    images: File[];

    @IsOptional()
    @IsNumber({}, { each: true })
    properties: number[];

    @IsOptional()
    @IsBoolean()
    isNew: Product['isNew'];

    @IsOptional()
    @IsString()
    comment: Product['comment'];
}

export class ProductUpdateDTO implements Partial<ProductCU> {
    @IsOptional()
    @IsNumber()
    priceCurrent?: ProductPrice['current'];

    @IsOptional()
    @IsNumber()
    priceOld?: ProductPrice['old'];

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsNumber()
    category?: Category['id'];

    @IsOptional()
    images?: File[];

    @IsOptional()
    @IsNumber({}, { each: true })
    properties?: Property['id'][];

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isNew?: boolean;

    @IsOptional()
    @IsString()
    comment?: string;
}
