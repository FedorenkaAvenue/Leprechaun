import { ApiProperty } from "@nestjs/swagger";

import { Property, PropertyGroup, PropertyGroupCU } from "@gen/prop_group";
import { Trans, TransData } from "@gen/trans";
import { TransSchema } from "@common/trans/trans.schema";

export class PropertyGroupSchema implements PropertyGroup {
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

    @ApiProperty({ type: () => PropertySchema, isArray: true })
    properties: Property[];

    @ApiProperty({ description: 'visible property for ProductCard' })
    isPrimary: boolean;
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
