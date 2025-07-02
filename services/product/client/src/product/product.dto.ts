import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { Product, ProductCU, ProductPrice, ProductStatus } from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { Property } from '@fedorenkaavenue/leprechaun_lib_entities/server/property';
import { Category } from '@fedorenkaavenue/leprechaun_lib_entities/server/category';
import { File } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';

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
