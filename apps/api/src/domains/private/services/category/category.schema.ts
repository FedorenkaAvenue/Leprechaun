import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Category, CategoryCU } from "@fedorenkaavenue/leprechaun_lib_entities/server/category";
import { File } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { PropertyGroupPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";
import { CategoryPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import { ProductPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

import { TransSchema } from '@common/trans/trans.schema';
import { PropertyGroupSchema } from '../propertyGroup/propertyGroup.schema';

export class CategoryPreviewSchema implements CategoryPreview {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    title: TransSchema;

    @ApiProperty()
    icon: string;

    @ApiProperty()
    iconId: string;

    @ApiProperty()
    isPublic: boolean;

    @ApiProperty()
    comment: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class CategorySchema extends CategoryPreviewSchema implements Category {
    @ApiProperty({ type: () => PropertyGroupSchema, isArray: true })
    propertyGroups: PropertyGroupPreview[];

    @ApiProperty({ isArray: true })
    products: ProductPreview[];
}

export class CategoryCUSchema implements CategoryCU {
    @ApiProperty()
    url: string;

    @ApiProperty()
    title: TransSchema;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'only SVG extension',
        default: null,
    })
    icon: File;

    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the property groups ID',
        isArray: true,
        default: [],
    })
    propertyGroups: number[];

    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    isPublic: boolean;

    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CategoryUpdateSchema implements CategoryCU {
    @ApiProperty({ required: false })
    url: string;

    @ApiProperty({ required: false })
    title: TransSchema;

    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    isPublic: boolean;

    @ApiProperty({
        type: 'array',
        required: false,
        description: 'only SVG extension',
        default: null,
    })
    icon: File;

    @ApiProperty({
        required: false,
        type: 'number',
        description: 'array of the property groups ID',
        isArray: true,
        default: [],
    })
    propertyGroups: number[];

    @ApiProperty({ required: false, default: null })
    comment: string;
}
