import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { Category, CategoryCU } from "@gen/category";
import { TransSchema } from '@common/trans/trans.schema';
import { File } from '@gen/common';
import { PropertyGroupPreview } from '@gen/prop_group';
import { PropertyGroupSchema } from '../propertyGroup/propertyGroup.schema';
import { CategoryPreview } from '@gen/category_preview';

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
