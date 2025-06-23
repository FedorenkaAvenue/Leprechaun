import { ApiProperty } from "@nestjs/swagger";

import { PropertyGroup, PropertyGroupCU, PropertyGroupPreview } from "@gen/property_group";
import { TransData } from "@gen/trans";
import { TransSchema } from "@common/trans/trans.schema";
import { CategoryPreview } from "@gen/_category_preview";
import { CategorySchema } from "../category/category.schema";
import { Property } from "@gen/property";

export class PropertyGroupPreviewSchema implements PropertyGroupPreview {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: TransSchema })
    title: TransData;

    @ApiProperty()
    altName: string;

    @ApiProperty()
    comment: string;

    @ApiProperty({ description: 'visible property for ProductCard' })
    isPrimary: boolean;

    @ApiProperty({ type: () => PropertySchema, isArray: true })
    properties: Property[];
}

export class PropertyGroupSchema extends PropertyGroupPreviewSchema implements PropertyGroup {
    @ApiProperty({ type: () => CategorySchema, isArray: true })
    categories: CategoryPreview[];
}

export class PropertySchema implements Property {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: TransSchema })
    title: TransData;

    @ApiProperty()
    altName: string;

    @ApiProperty()
    comment: string;
}

export class PropertyGroupCUSchema implements PropertyGroupCU {
    @ApiProperty()
    title: TransSchema;

    @ApiProperty()
    altName: string;

    @ApiProperty({ required: false, description: 'visible property for ProductCard', default: false })
    isPrimary: boolean;

    @ApiProperty({ required: false, default: null })
    comment: string;
}
